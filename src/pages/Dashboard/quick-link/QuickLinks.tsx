import { LandPlot, User, Search,LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { route } from '../../../helpers/routes';
import SearchModal from '../SearchModal';
import { useModal } from '../../../components/useModalActions';

export default function QuickLinks() {
  const {open:OpenSearchModal,close:CloseSearchModal} = useModal('search_modal')
  const links = [
    {
      title: "Lands",
      icon: <LandPlot className="w-8 h-8 text-blue-600" />,
      to: route.MANAGE_LANDS,
      bgColor: "bg-blue-50",
    },
    {
      title: "Users",
      icon: <User className="w-8 h-8 text-purple-600" />,
      to: route.MANAGE_USERS,
      bgColor: "bg-purple-50",
    },
    {
      title: "Search",
      icon: <Search className="w-8 h-8 text-sky-600" />,
      bgColor: "bg-sky-50",
    },
    {
      title: "Settings",
      icon: <Settings className="w-8 h-8 text-orange-600" />,
      to: route.SETTINGS,
      bgColor: "bg-orange-50",
    },
    {
      title: "Logout",
      icon: <LogOut className="w-8 h-8 text-green-600" />,
      to: route.LOGIN,
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl">
      <h2 className="text-xl  text-gray-800 mb-4">Quick links</h2>
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
              onClick={OpenSearchModal}
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
      <SearchModal close={CloseSearchModal}/>
    </div>
  );
}