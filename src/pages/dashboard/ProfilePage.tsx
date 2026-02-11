import { Mail, Shield, Building, MapPin, Calendar, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) return null;

    const initials = user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    const firstName = user.name.split(' ')[0];
    const lastName = user.name.split(' ').slice(1).join(' ');

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    User Profile
                    <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                </h1>
                <p className="text-sm text-muted-foreground max-w-2xl">
                    Security Operations Center • Account Management & System Access
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-12">
                {/* ID Card / Sidebar */}
                <div className="md:col-span-4 lg:col-span-3 space-y-6">
                    <Card className="glass-card border-border/50 overflow-hidden relative group">
                        <div className="h-32 bg-gradient-to-br from-cyan-950 via-slate-900 to-background relative">
                            <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')]"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                        </div>
                        <div className="px-6 pb-8 relative">
                            <div className="flex justify-center -mt-12 mb-6">
                                <div className="relative group/avatar">
                                    <Avatar className="h-32 w-32 ring-4 ring-background shadow-xl transition-transform duration-500 group-hover/avatar:scale-105">
                                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} />
                                        <AvatarFallback className="bg-secondary text-secondary-foreground text-3xl font-bold">{initials}</AvatarFallback>
                                    </Avatar>
                                    <Button size="icon" variant="secondary" className="absolute bottom-1 right-1 rounded-full h-8 w-8 opacity-0 group-hover/avatar:opacity-100 transition-all bg-cyan-500 text-black hover:bg-cyan-400">
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold text-foreground tracking-tight">{user.name}</h2>
                                {user.role === 'admin' ? (
                                    <Badge className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 border-cyan-500/20">
                                        System Administrator
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary">
                                        Security Tester
                                    </Badge>
                                )}
                            </div>

                            <Separator className="my-6 bg-border/50" />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                                    <div className="p-2 rounded-md bg-secondary/50 group-hover/item:bg-cyan-500/10 transition-colors">
                                        <Mail className="h-4 w-4 text-muted-foreground group-hover/item:text-cyan-500" />
                                    </div>
                                    <span className="truncate">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                                    <div className="p-2 rounded-md bg-secondary/50 group-hover/item:bg-cyan-500/10 transition-colors">
                                        <Building className="h-4 w-4 text-muted-foreground group-hover/item:text-cyan-500" />
                                    </div>
                                    <span>NetAlert Inc.</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                                    <div className="p-2 rounded-md bg-secondary/50 group-hover/item:bg-cyan-500/10 transition-colors">
                                        <MapPin className="h-4 w-4 text-muted-foreground group-hover/item:text-cyan-500" />
                                    </div>
                                    <span>San Francisco, CA</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground group/item">
                                    <div className="p-2 rounded-md bg-secondary/50 group-hover/item:bg-cyan-500/10 transition-colors">
                                        <Calendar className="h-4 w-4 text-muted-foreground group-hover/item:text-cyan-500" />
                                    </div>
                                    <span>Joined {new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:col-span-8 lg:col-span-9 space-y-8">
                    <Card className="glass-card border-border/50 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-bold text-foreground tracking-tight">Personal Information</CardTitle>
                            <CardDescription className="text-muted-foreground">Update your contact details and identity profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2.5">
                                    <Label htmlFor="firstName" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">First name</Label>
                                    <Input id="firstName" defaultValue={firstName} className="bg-background/50 border-input h-11 focus:ring-cyan-500/50 transition-all" />
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="lastName" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Last name</Label>
                                    <Input id="lastName" defaultValue={lastName} className="bg-background/50 border-input h-11 focus:ring-cyan-500/50 transition-all" />
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email address</Label>
                                    <Input id="email" defaultValue={user.email} type="email" className="bg-background/50 border-input h-11 focus:ring-cyan-500/50 transition-all" />
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="phone" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone number</Label>
                                    <Input id="phone" defaultValue="+1 (555) 000-0000" type="tel" className="bg-background/50 border-input h-11 focus:ring-cyan-500/50 transition-all" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button variant="ghost" className="text-muted-foreground hover:bg-secondary/50">Cancel</Button>
                                <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 shadow-lg shadow-cyan-500/20">
                                    Save Profile Data
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-border/50 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-bold text-foreground tracking-tight">Security & Permissions</CardTitle>
                            <CardDescription className="text-muted-foreground">Validate your organization-wide access controls.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-border/50 rounded-xl bg-secondary/20 gap-4 group/box hover:bg-secondary/30 transition-colors">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-cyan-500/10 rounded-xl group-hover/box:scale-110 transition-transform">
                                        <Shield className="h-6 w-6 text-cyan-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground flex items-center gap-2">
                                            {user.role === 'admin' ? 'Super Administrator' : 'Standard User'}
                                            <span className="text-[10px] bg-cyan-500/20 text-cyan-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                                {user.role === 'admin' ? 'Level 4' : 'Level 2'}
                                            </span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {user.role === 'admin'
                                                ? 'Full read/write access to all security modules and network data'
                                                : 'Read-only access to standard dashboards and reports'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 self-end sm:self-center">
                                    <div className="h-2 w-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,1)]"></div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Verified Identity</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
