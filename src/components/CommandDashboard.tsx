
import React, { useState } from 'react';
import { Terminal, Search, Users, Activity, Wifi, Folder } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Command {
  id: string;
  name: string;
  command: string;
  category: 'file' | 'process' | 'system' | 'network' | 'user';
  icon: React.ReactNode;
  placeholder: string;
}

const commands: Command[] = [
  { id: 'ls', name: 'List Files', command: 'ls', category: 'file', icon: <Folder className="w-4 h-4" />, placeholder: "Directory path (optional)" },
  { id: 'find', name: 'Find Files', command: 'find', category: 'file', icon: <Search className="w-4 h-4" />, placeholder: "Search pattern" },
  { id: 'ps', name: 'Process Status', command: 'ps', category: 'process', icon: <Activity className="w-4 h-4" />, placeholder: "Process options (e.g., aux)" },
  { id: 'whoami', name: 'Current User', command: 'whoami', category: 'user', icon: <Users className="w-4 h-4" />, placeholder: "No arguments needed" },
  { id: 'ping', name: 'Ping Host', command: 'ping', category: 'network', icon: <Wifi className="w-4 h-4" />, placeholder: "Hostname or IP" },
  { id: 'df', name: 'Disk Usage', command: 'df', category: 'system', icon: <Terminal className="w-4 h-4" />, placeholder: "Options (e.g., -h)" },
];

const CommandDashboard = () => {
  const { toast } = useToast();
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const handleInputChange = (commandId: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [commandId]: value
    }));
  };

  const executeCommand = (command: Command) => {
    const args = inputs[command.id] || '';
    const fullCommand = `${command.command} ${args}`.trim();
    
    // In a real application, you would execute the command here
    toast({
      title: "Command Executed",
      description: `${fullCommand}`,
      duration: 3000,
    });
  };

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Linux Command Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commands.map((cmd) => (
          <div key={cmd.id} className="command-card">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                {cmd.icon}
                <h2 className="font-semibold">{cmd.name}</h2>
              </div>
              
              <Input
                type="text"
                placeholder={cmd.placeholder}
                value={inputs[cmd.id] || ''}
                onChange={(e) => handleInputChange(cmd.id, e.target.value)}
                className="bg-white/50"
              />
              
              <button
                onClick={() => executeCommand(cmd)}
                className={`command-button ${cmd.category}`}
              >
                {cmd.icon}
                Execute {cmd.command}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandDashboard;
