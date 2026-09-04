import React from 'react';
import { MainCategory, CategoryInfo } from '../types';
import { 
  Grid, 
  Shirt, 
  Sparkles, 
  Smile, 
  Heart, 
  Moon, 
  Shield, 
  Layers 
} from 'lucide-react';

interface CategoryBarProps {
  categories: CategoryInfo[];
  selectedCategory: MainCategory;
  onSelectCategory: (category: MainCategory) => void;
  productCounts: Record<string, number>;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  productCounts,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Grid': return <Grid className="w-4 h-4" />;
      case 'Shirt': return <Shirt className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Smile': return <Smile className="w-4 h-4" />;
      case 'Heart': return <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />;
      case 'Moon': return <Moon className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      default: return <Grid className="w-4 h-4" />;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <span>دسته بندی‌های تخصصی بازار</span>
          <span className="text-xs text-slate-400 font-normal">انتخاب کنید:</span>
        </h3>
      </div>

      <div className="flex overflow-x-auto gap-2.5 pb-2 no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = cat.id === 'all' 
            ? Object.values(productCounts).reduce((a: number, b: number) => a + b, 0)
            : (productCounts[cat.id] || 0);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border shadow-sm ${
                isSelected
                  ? 'bg-indigo-700 text-white border-indigo-700 ring-2 ring-indigo-500/30 shadow-md scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100/80 hover:border-slate-300'
              }`}
            >
              <span className={isSelected ? 'text-amber-300' : 'text-indigo-600'}>
                {getIcon(cat.iconName)}
              </span>
              <span>{cat.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isSelected 
                  ? 'bg-amber-400 text-slate-950' 
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
