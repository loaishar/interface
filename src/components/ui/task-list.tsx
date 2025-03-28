import React, { useState } from 'react';
import { Badge } from './badge';
import { Button } from './button';
import { Progress } from './progress';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  subtasks?: Task[];
  progress?: number;
  description?: string;
  hasChart?: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string, completed: boolean) => void;
  onSkipToResults?: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskToggle,
  onSkipToResults
}) => {
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});

  const toggleExpand = (taskId: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const renderTask = (task: Task, level = 0) => {
    const isExpanded = expandedTasks[task.id] || false;
    const hasSubtasks = task.subtasks && task.subtasks.length > 0;
    
    return (
      <div key={task.id} className="mb-2">
        <div className={`flex items-start gap-2 p-3 rounded-lg ${task.completed ? 'bg-background-success bg-opacity-10' : 'bg-fill-tsp-white-main'}`}>
          {/* Indentation based on level */}
          {level > 0 && (
            <div className="w-4 h-full" style={{ marginLeft: `${(level - 1) * 16}px` }}></div>
          )}
          
          {/* Expand/collapse arrow for tasks with subtasks */}
          {hasSubtasks ? (
            <button 
              onClick={() => toggleExpand(task.id)}
              className="w-5 h-5 flex items-center justify-center text-text-secondary hover:text-text-primary"
            >
              {isExpanded ? '▼' : '►'}
            </button>
          ) : (
            <div className="w-5 h-5"></div>
          )}
          
          {/* Checkbox */}
          <div className="flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => onTaskToggle(task.id, e.target.checked)}
              className="h-4 w-4 rounded border-border-main text-icon-brand focus:ring-icon-brand"
            />
          </div>
          
          {/* Task content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-medium ${task.completed ? 'text-text-secondary line-through' : 'text-text-primary'}`}>
                {task.title}
              </h3>
              
              {task.progress !== undefined && (
                <Badge className="bg-fill-tsp-white-dark text-text-secondary text-xs">
                  {task.progress}%
                </Badge>
              )}
            </div>
            
            {task.description && (
              <p className="text-xs text-text-secondary mt-1">{task.description}</p>
            )}
            
            {task.progress !== undefined && (
              <Progress value={task.progress} className="h-1 mt-2" />
            )}
            
            {/* Example chart placeholder */}
            {task.hasChart && (
              <div className="mt-2 h-16 bg-fill-tsp-white-dark rounded flex items-center justify-center">
                <span className="text-xs text-text-tertiary">Chart visualization</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Render subtasks if expanded */}
        {isExpanded && hasSubtasks && (
          <div className="ml-4 mt-1">
            {task.subtasks!.map(subtask => renderTask(subtask, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Calculate overall progress
  const totalTasks = tasks.reduce((count, task) => {
    const countSubtasks = (t: Task): number => {
      let count = 1;
      if (t.subtasks) {
        t.subtasks.forEach(st => {
          count += countSubtasks(st);
        });
      }
      return count;
    };
    return count + countSubtasks(task);
  }, 0);
  
  const completedTasks = tasks.reduce((count, task) => {
    const countCompletedSubtasks = (t: Task): number => {
      let count = t.completed ? 1 : 0;
      if (t.subtasks) {
        t.subtasks.forEach(st => {
          count += countCompletedSubtasks(st);
        });
      }
      return count;
    };
    return count + countCompletedSubtasks(task);
  }, 0);
  
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="w-full">
      {/* Header with progress and skip button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-text-primary">Task Progress</h2>
          <Badge className="bg-fill-tsp-white-dark text-text-secondary">
            {completedTasks}/{totalTasks}
          </Badge>
        </div>
        
        {onSkipToResults && (
          <Button
            onClick={onSkipToResults}
            className="text-xs border border-border-light bg-fill-tsp-white-main hover:bg-fill-tsp-white-dark px-3 py-1"
          >
            Skip to Results
          </Button>
        )}
      </div>
      
      {/* Overall progress bar */}
      <div className="mb-4">
        <Progress value={overallProgress} className="h-2" />
      </div>
      
      {/* Task list */}
      <div className="space-y-1">
        {tasks.map(task => renderTask(task))}
      </div>
    </div>
  );
};