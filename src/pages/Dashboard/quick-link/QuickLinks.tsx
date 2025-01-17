import { BarChart3, Users, UserCircle, GraduationCap, Clock, DollarSign, Award, FileText, ShoppingCart, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import {useModal} from '../../../components/Modal';

export default function QuickLinks() {
  const links = [
    {
      title: "Settlement",
      icon: <DollarSign className="w-8 h-8 text-blue-600" />,
      to: "/",
      bgColor: "bg-blue-50",
    },
    {
      title: "Nominees",
      icon: <Award className="w-8 h-8 text-purple-600" />,
      to: "/",
      bgColor: "bg-purple-50",
    },
    {
      title: "Results",
      icon: <FileText className="w-8 h-8 text-sky-600" />,
      to: "/",
      bgColor: "bg-sky-50",
    },
    {
      title: "Transactions",
      icon: <ShoppingCart className="w-8 h-8 text-orange-600" />,
      to: "/",
      bgColor: "bg-orange-50",
    },
    {
      title: "Categories",
      icon: <Tag className="w-8 h-8 text-green-600" />,
      to: "/",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick links</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {links.map((link) => (
          link.to ? (
            <Link
              key={link.title}
              to={link.to}
              className={`flex flex-col items-center justify-center p-6 rounded-xl ${link.bgColor} hover:opacity-50 transition-opacity`}
            >
              {link.icon}
              <span className="mt-2 text-sm font-medium text-gray-700">
                {link.title}
              </span>
            </Link>
          ) : (
            <div
              key={link.title}
              onClick={link.onClick}
              className={`cursor-pointer flex flex-col items-center justify-center p-6 rounded-xl ${link.bgColor} hover:opacity-50 transition-opacity`}
            >
              {link.icon}
              <span className="mt-2 text-sm font-medium text-gray-700">
                {link.title}
              </span>
            </div>
          )
        ))}
      </div>
    </div>
  );
}