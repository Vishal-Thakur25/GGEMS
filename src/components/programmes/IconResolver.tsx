import React from 'react';
import {
  Activity,
  Dumbbell,
  Brain,
  TrendingUp,
  Users,
  Award,
  Layers,
  Trophy,
  Footprints,
  BarChart3,
  Medal,
  Smile,
  GraduationCap,
  BookOpen,
  Briefcase,
  Building,
  Landmark,
  Target,
  Shield,
  CircleDot,
  CheckCircle2,
  Sparkles,
  Zap,
  Flame,
  Heart,
  Clock,
  Compass,
} from 'lucide-react';

export function resolveProgrammeIcon(iconName?: string | null, className = 'w-5 h-5') {
  if (!iconName) return <Sparkles className={className} />;

  switch (iconName.toLowerCase().trim()) {
    case 'activity':
    case 'racket':
    case 'skills':
      return <Activity className={className} />;
    case 'dumbbell':
    case 'fitness':
    case 'gym':
      return <Dumbbell className={className} />;
    case 'brain':
    case 'mental':
    case 'mind':
      return <Brain className={className} />;
    case 'trendingup':
    case 'career':
    case 'growth':
      return <TrendingUp className={className} />;
    case 'users':
    case 'group':
    case 'all':
      return <Users className={className} />;
    case 'award':
    case 'coach':
    case 'certificate':
      return <Award className={className} />;
    case 'layers':
    case 'batch':
      return <Layers className={className} />;
    case 'trophy':
    case 'tournament':
      return <Trophy className={className} />;
    case 'footprints':
    case 'beginner':
    case 'steps':
      return <Footprints className={className} />;
    case 'barchart3':
    case 'intermediate':
    case 'chart':
      return <BarChart3 className={className} />;
    case 'medal':
    case 'advanced':
    case 'competitive':
      return <Medal className={className} />;
    case 'smile':
    case 'kids':
      return <Smile className={className} />;
    case 'graduationcap':
    case 'student':
    case 'school':
      return <GraduationCap className={className} />;
    case 'bookopen':
    case 'college':
      return <BookOpen className={className} />;
    case 'briefcase':
    case 'professional':
    case 'corporate':
      return <Briefcase className={className} />;
    case 'building':
    case 'institution':
      return <Building className={className} />;
    case 'landmark':
      return <Landmark className={className} />;
    case 'target':
      return <Target className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'circledot':
      return <CircleDot className={className} />;
    case 'zap':
      return <Zap className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'clock':
      return <Clock className={className} />;
    case 'compass':
      return <Compass className={className} />;
    default:
      return <CheckCircle2 className={className} />;
  }
}
