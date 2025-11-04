export default "test";
// import React, { useState, Suspense, lazy } from "react";
// import { iconsMeta } from "./iconsMeta";

// interface IconPickerProps {
//   value: string;
//   onChange: (iconName: string) => void;
// }

// const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
//   const [search, setSearch] = useState("");

//   const filteredIcons = iconsMeta.filter((name) =>
//     name.toLowerCase().includes(search.toLowerCase())
//   );

//   const LazyIcon = (name: string) =>
//     lazy(() => import(`@mui/icons-material/${name}`));

//   return (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         Choisis une icône :
//       </label>

//       <input
//         type="text"
//         placeholder="Rechercher..."
//         className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="grid grid-cols-6 gap-2 max-h-64 overflow-y-auto">
//         {filteredIcons.slice(0, 60).map((name) => {
//           const IconComponent = LazyIcon(name);

//           return (
//             <Suspense
//               fallback={
//                 <div className="h-10 w-10 animate-pulse bg-gray-200 rounded" />
//               }
//             >
//               <button
//                 key={name}
//                 onClick={() => onChange(name)}
//                 className={`p-2 border rounded flex items-center justify-center hover:bg-blue-100 transition ${
//                   value === name
//                     ? "border-blue-500 bg-blue-50"
//                     : "border-gray-200"
//                 }`}
//                 title={name}
//               >
//                 <IconComponent fontSize="small" />
//               </button>
//             </Suspense>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default IconPicker;
