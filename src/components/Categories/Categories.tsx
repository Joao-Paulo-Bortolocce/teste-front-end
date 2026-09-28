import {
  Dumbbell,
  Hammer,
  HeartHandshake,
  MonitorSmartphone,
  Shirt,
  Store,
  Wine,
  type LucideIcon,
} from 'lucide-react';
import './Categories.scss';

interface Category {
  name: string;
  Icon: LucideIcon;
}

const CATEGORIES: Category[] = [
  { name: 'Tecnologia', Icon: MonitorSmartphone },
  { name: 'Supermercado', Icon: Store },
  { name: 'Bebidas', Icon: Wine },
  { name: 'Ferramentas', Icon: Hammer },
  { name: 'Saúde', Icon: HeartHandshake },
  { name: 'Esportes e Fitness', Icon: Dumbbell },
  { name: 'Moda', Icon: Shirt },
];

export function Categories() {
  return (
    <nav className="categories" aria-label="Navegar por categorias">
      <ul>
        {CATEGORIES.map(({ name, Icon }) => {
          const isActive = name === 'Tecnologia';
          return (
            <li key={name}>
              <a href="#vitrine" className={isActive ? 'is-active' : undefined}>
                <span className="categories__icon" aria-hidden="true">
                  <Icon size={34} strokeWidth={1.5} />
                </span>
                <span className="categories__label">{name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
