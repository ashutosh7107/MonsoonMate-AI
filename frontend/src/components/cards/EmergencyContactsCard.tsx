import { Phone, Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';
import { EmergencyContact } from '../../types';

interface EmergencyContactsCardProps {
  contacts: EmergencyContact[];
}

export function EmergencyContactsCard({ contacts }: EmergencyContactsCardProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (number: string) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopied(number);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div className="glass-card border border-red-500/20 bg-gradient-to-br from-red-900/15 to-rose-900/10 p-5 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-red-500/15 rounded-xl flex items-center justify-center">
          <Phone className="w-5 h-5 text-red-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Emergency Contacts</h3>
          <p className="text-xs text-slate-400">Save these numbers before the monsoon</p>
        </div>
        <div className="ml-auto">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse inline-block mr-1" />
          <span className="text-xs text-red-300">Important</span>
        </div>
      </div>

      {/* Contacts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {contacts.map((contact) => (
          <div
            key={contact.number}
            className="bg-white/5 border border-white/8 rounded-xl p-4 hover:border-red-500/30 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="w-8 h-8 bg-red-500/15 rounded-lg flex items-center justify-center">
                <Phone className="w-4 h-4 text-red-400" />
              </div>
              <button
                onClick={() => handleCopy(contact.number)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/10"
                title="Copy number"
              >
                {copied === contact.number ? (
                  <CheckCheck className="w-3.5 h-3.5 text-green-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>
            <h4 className="text-white font-semibold text-sm mb-0.5">{contact.name}</h4>
            <div className="text-lg font-black text-red-300 mb-1 tracking-wide">{contact.number}</div>
            <p className="text-xs text-slate-500 leading-relaxed">{contact.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-slate-600">
          💡 Save these contacts on your phone now. Tap any number card to copy.
        </p>
      </div>
    </div>
  );
}
