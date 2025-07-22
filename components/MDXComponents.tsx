import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Info,
    ArrowRight,
    Mail,
    Phone,
    ExternalLink,
    Download,
    Upload,
    Settings,
    User,
    Lock,
    Shield,
    FileText,
    Calendar,
    Clock
} from 'lucide-react';

// Icon components for easy use in MDX
export const Icons = {
    CheckCircle: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <CheckCircle className={`text-green-600 ${className}`} />
    ),
    XCircle: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <XCircle className={`text-red-600 ${className}`} />
    ),
    AlertTriangle: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <AlertTriangle className={`text-yellow-600 ${className}`} />
    ),
    Info: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Info className={`text-blue-600 ${className}`} />
    ),
    ArrowRight: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <ArrowRight className={`text-slate-600 ${className}`} />
    ),
    Mail: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Mail className={`text-slate-600 ${className}`} />
    ),
    Phone: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Phone className={`text-slate-600 ${className}`} />
    ),
    ExternalLink: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <ExternalLink className={`text-slate-600 ${className}`} />
    ),
    Download: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Download className={`text-slate-600 ${className}`} />
    ),
    Upload: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Upload className={`text-slate-600 ${className}`} />
    ),
    Settings: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Settings className={`text-slate-600 ${className}`} />
    ),
    User: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <User className={`text-slate-600 ${className}`} />
    ),
    Lock: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Lock className={`text-slate-600 ${className}`} />
    ),
    Shield: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Shield className={`text-slate-600 ${className}`} />
    ),
    FileText: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <FileText className={`text-slate-600 ${className}`} />
    ),
    Calendar: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Calendar className={`text-slate-600 ${className}`} />
    ),
    Clock: ({ className = "w-4 h-4 inline" }: { className?: string }) => (
        <Clock className={`text-slate-600 ${className}`} />
    ),
};

// Status badge component
export const StatusBadge = ({ status, children }: { status: 'complete' | 'progress' | 'planned'; children: React.ReactNode }) => {
    const styles = {
        complete: 'bg-green-100 text-green-800 border-green-200',
        progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        planned: 'bg-gray-100 text-gray-800 border-gray-200'
    };

    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
            {status === 'complete' && <Icons.CheckCircle className="w-3 h-3 mr-1" />}
            {status === 'progress' && <Icons.Clock className="w-3 h-3 mr-1" />}
            {status === 'planned' && <Icons.AlertTriangle className="w-3 h-3 mr-1" />}
            {children}
        </span>
    );
};

// Callout component for important information
export const Callout = ({ type = 'info', children }: { type?: 'info' | 'warning' | 'error' | 'success'; children: React.ReactNode }) => {
    const styles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800',
        success: 'bg-green-50 border-green-200 text-green-800'
    };

    const icons = {
        info: <Icons.Info className="w-5 h-5 mr-2 flex-shrink-0" />,
        warning: <Icons.AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />,
        error: <Icons.XCircle className="w-5 h-5 mr-2 flex-shrink-0" />,
        success: <Icons.CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
    };

    return (
        <div className={`flex items-start p-4 rounded-lg border mb-4 ${styles[type]}`}>
            {icons[type]}
            <div>{children}</div>
        </div>
    );
};

// Contact info component
export const ContactInfo = ({ type, value, label }: { type: 'email' | 'phone' | 'ext'; value: string; label?: string }) => {
    const icon = type === 'email' ? <Icons.Mail className="w-4 h-4 mr-2" /> : <Icons.Phone className="w-4 h-4 mr-2" />;

    return (
        <div className="flex items-center text-sm text-slate-600 mb-2">
            {icon}
            <span className="font-medium mr-2">{label || type}:</span>
            <span>{value}</span>
        </div>
    );
};

// Step component for procedures
export const Step = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => {
    return (
        <div className="step-container">
            <div className="step-number">
                {number}
            </div>
            <div className="step-content">
                <h4 className="step-title">{title}</h4>
                <div className="step-description">{children}</div>
            </div>
        </div>
    );
};

export const MDXComponents = {
    Icons,
    StatusBadge,
    Callout,
    ContactInfo,
    Step
} as any;