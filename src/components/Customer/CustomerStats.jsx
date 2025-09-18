// // import { Users, UserCheck, UserX, UserMinus, TrendingUp, TrendingDown } from "lucide-react";

// // export default function CustomerStats() {
// //   // Sample data - आप अपना actual data यहाँ pass कर सकते हैं
// //   const customers = [
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Active" },
// //     { status: "Inactive" },
// //     { status: "Inactive" },
// //     { status: "Inactive" },
// //     { status: "Inactive" },
// //     { status: "Inactive" },
// //     { status: "Blocked" },
// //     { status: "Blocked" },
// //   ];

// //   const activeCount = customers.filter(c => c.status === "Active").length;
// //   const inactiveCount = customers.filter(c => c.status === "Inactive").length;
// //   const blockedCount = customers.filter(c => c.status === "Blocked").length;
// //   const totalCount = customers.length;

// //   const stats = [
// //     { 
// //       label: "Total Customers", 
// //       value: totalCount, 
// //       color: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-200",
// //       icon: Users,
// //       change: "+12%",
// //       changeColor: "text-green-600",
// //       trend: TrendingUp
// //     },
// //     { 
// //       label: "Active", 
// //       value: activeCount, 
// //       color: "bg-gradient-to-br from-green-50 to-green-100 text-green-700 border-green-200",
// //       icon: UserCheck,
// //       change: "+8%",
// //       changeColor: "text-green-600",
// //       trend: TrendingUp
// //     },
// //     { 
// //       label: "Inactive", 
// //       value: inactiveCount, 
// //       color: "bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200",
// //       icon: UserMinus,
// //       change: "-3%",
// //       changeColor: "text-red-600",
// //       trend: TrendingDown
// //     },
// //     { 
// //       label: "Blocked", 
// //       value: blockedCount, 
// //       color: "bg-gradient-to-br from-red-50 to-red-100 text-red-700 border-red-200",
// //       icon: UserX,
// //       change: "+1%",
// //       changeColor: "text-red-600",
// //       trend: TrendingUp
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 p-6">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="mb-8">
// //           <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Statistics</h1>
// //           <p className="text-gray-600">Overview of your customer base performance</p>
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {stats.map((stat, index) => {
// //             const Icon = stat.icon;
// //             const TrendIcon = stat.trend;
// //             return (
// //               <div
// //                 key={stat.label}
// //                 className={`relative p-6 rounded-3xl shadow-lg border-2 ${stat.color} transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer`}
// //                 style={{ 
// //                   animationDelay: `${index * 150}ms`,
// //                   animation: 'fadeInUp 0.6s ease-out forwards'
// //                 }}
// //               >
// //                 <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
// //                 {/* Floating animation circles */}
// //                 <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
// //                 <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white/10 rounded-full animate-pulse"></div>
                
// //                 <div className="relative z-10">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
// //                       <Icon size={24} className="opacity-90" />
// //                     </div>
// //                     <div className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm ${stat.changeColor}`}>
// //                       <TrendIcon size={12} />
// //                       {stat.change}
// //                     </div>
// //                   </div>
                  
// //                   <div className="space-y-2">
// //                     <p className="text-sm font-semibold opacity-90 uppercase tracking-wide">
// //                       {stat.label}
// //                     </p>
// //                     <p className="text-4xl font-black leading-none tracking-tight">
// //                       {stat.value}
// //                     </p>
// //                   </div>

// //                   {/* Progress bar */}
// //                   <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
// //                     <div 
// //                       className="h-full bg-white/40 rounded-full transition-all duration-1000 ease-out"
// //                       style={{ 
// //                         width: `${(stat.value / totalCount) * 100}%`,
// //                         animationDelay: `${index * 200 + 500}ms`
// //                       }}
// //                     ></div>
// //                   </div>
                  
// //                   <div className="mt-3 flex justify-between items-center text-xs opacity-75">
// //                     <span>This month</span>
// //                     <span>{((stat.value / totalCount) * 100).toFixed(1)}%</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Additional insights section */}
// //         <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
// //             <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Insights</h3>
// //             <div className="space-y-4">
// //               <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
// //                   <span className="text-gray-700 font-medium">Active Rate</span>
// //                 </div>
// //                 <span className="text-green-700 font-bold text-lg">
// //                   {((activeCount / totalCount) * 100).toFixed(1)}%
// //                 </span>
// //               </div>
              
// //               <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
// //                   <span className="text-gray-700 font-medium">Total Growth</span>
// //                 </div>
// //                 <span className="text-blue-700 font-bold text-lg">+12%</span>
// //               </div>
              
// //               <div className="flex items-center justify-between p-4 bg-purple-50 rounded-2xl">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
// //                   <span className="text-gray-700 font-medium">Retention Rate</span>
// //                 </div>
// //                 <span className="text-purple-700 font-bold text-lg">89.2%</span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-lg text-white">
// //             <h3 className="text-2xl font-bold mb-6">Performance Summary</h3>
// //             <div className="space-y-6">
// //               <div>
// //                 <p className="text-indigo-100 text-sm mb-2">Customer Satisfaction</p>
// //                 <div className="flex items-center gap-4">
// //                   <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
// //                     <div className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full w-4/5 transition-all duration-1000"></div>
// //                   </div>
// //                   <span className="text-xl font-bold">4.8/5</span>
// //                 </div>
// //               </div>
              
// //               <div>
// //                 <p className="text-indigo-100 text-sm mb-2">Monthly Target</p>
// //                 <div className="flex items-center gap-4">
// //                   <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
// //                     <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full w-3/4 transition-all duration-1000"></div>
// //                   </div>
// //                   <span className="text-xl font-bold">75%</span>
// //                 </div>
// //               </div>
              
// //               <div className="mt-6 pt-6 border-t border-white/20">
// //                 <p className="text-indigo-100 text-sm">Next milestone</p>
// //                 <p className="text-xl font-bold">25 customers to reach 100</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @keyframes fadeInUp {
// //           from {
// //             opacity: 0;
// //             transform: translateY(30px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }


// // ✅ Cleaned & Improved CustomerStats Component

// export default function CustomerStats({ customers }) {
//   const activeCount = customers.filter(c => c.status === "Active").length;
//   const inactiveCount = customers.filter(c => c.status === "Inactive").length;
//   const blockedCount = customers.filter(c => c.status === "Blocked").length;
//   const totalCount = customers.length;

//   const stats = [
//     { 
//       label: "Total Customers", 
//       value: totalCount, 
//       color: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-200",
//       icon: "👥",
//       change: "+12%",
//       changeColor: "text-green-600"
//     },
//     { 
//       label: "Active", 
//       value: activeCount, 
//       color: "bg-gradient-to-br from-green-50 to-green-100 text-green-700 border-green-200",
//       icon: "✅",
//       change: "+8%",
//       changeColor: "text-green-600"
//     },
//     { 
//       label: "Inactive", 
//       value: inactiveCount, 
//       color: "bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200",
//       icon: "⏸️",
//       change: "-3%",
//       changeColor: "text-red-600"
//     },
//     { 
//       label: "Blocked", 
//       value: blockedCount, 
//       color: "bg-gradient-to-br from-red-50 to-red-100 text-red-700 border-red-200",
//       icon: "🚫",
//       change: "+1%",
//       changeColor: "text-red-600"
//     },
//   ];

//   return (
//     <div className="mb-8">
//       {/* Heading */}
//       <div className="mb-6">
//         <h2 className="text-3xl font-extrabold text-gray-900 mb-2">📊 Customer Statistics</h2>
//         <p className="text-gray-600">Real-time overview of your customer base</p>
//       </div>

//       {/* Top Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div
//             key={stat.label}
//             className={`relative p-6 rounded-2xl shadow-xl border-2 ${stat.color} transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group cursor-pointer`}
//           >
//             {/* Hover overlay */}
//             <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
//             {/* Floating ping circle */}
//             <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/20 rounded-full animate-ping"></div>
            
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="p-2 rounded-xl bg-white/30 backdrop-blur-sm text-2xl">
//                   {stat.icon}
//                 </div>
//                 <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-white/30 backdrop-blur-sm ${stat.changeColor}`}>
//                   {stat.change}
//                 </div>
//               </div>
              
//               <div className="space-y-2">
//                 <p className="text-sm font-semibold opacity-90 uppercase tracking-wide">
//                   {stat.label}
//                 </p>
//                 <p className="text-4xl font-black leading-none">
//                   {stat.value}
//                 </p>
//               </div>

//               {/* Progress bar */}
//               <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
//                 <div 
//                   className="h-full bg-white/50 rounded-full transition-all duration-1000 ease-out"
//                   style={{ 
//                     width: totalCount > 0 ? `${(stat.value / totalCount) * 100}%` : '0%'
//                   }}
//                 ></div>
//               </div>
              
//               <div className="mt-2 flex justify-between items-center text-xs opacity-75">
//                 <span>Live Data</span>
//                 <span>{totalCount > 0 ? ((stat.value / totalCount) * 100).toFixed(1) : 0}%</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bottom 3 Sections */}
//       <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Quick Insights */}
//         <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">⚡ Quick Insights</h3>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <span className="text-gray-700 font-medium text-sm">Active Rate</span>
//               </div>
//               <span className="text-green-700 font-bold">
//                 {totalCount > 0 ? ((activeCount / totalCount) * 100).toFixed(1) : 0}%
//               </span>
//             </div>
            
//             <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                 <span className="text-gray-700 font-medium text-sm">Inactive Rate</span>
//               </div>
//               <span className="text-yellow-700 font-bold">
//                 {totalCount > 0 ? ((inactiveCount / totalCount) * 100).toFixed(1) : 0}%
//               </span>
//             </div>
            
//             <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                 <span className="text-gray-700 font-medium text-sm">Blocked Rate</span>
//               </div>
//               <span className="text-red-700 font-bold">
//                 {totalCount > 0 ? ((blockedCount / totalCount) * 100).toFixed(1) : 0}%
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Performance Box */}
//         <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
//           <h3 className="text-xl font-bold mb-4">📈 Performance</h3>
//           <div className="space-y-4">
//             <div>
//               <p className="text-blue-100 text-sm mb-2">Customer Health</p>
//               <div className="flex items-center gap-3">
//                 <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all duration-1000"
//                     style={{ width: `${totalCount > 0 ? ((activeCount / totalCount) * 100) : 0}%` }}
//                   ></div>
//                 </div>
//                 <span className="text-lg font-bold">
//                   {totalCount > 0 ? ((activeCount / totalCount) * 100).toFixed(0) : 0}%
//                 </span>
//               </div>
//             </div>
            
//             <div className="pt-3 border-t border-white/20">
//               <p className="text-blue-100 text-sm">Total Customers</p>
//               <p className="text-2xl font-bold">{totalCount}</p>
//             </div>
//           </div>
//         </div>

//         {/* Breakdown Box */}
//         <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white">
//           <h3 className="text-xl font-bold mb-4">📊 Status Breakdown</h3>
//           <div className="space-y-3">
//             <div className="flex justify-between items-center">
//               <span className="text-green-100">✅ Active</span>
//               <span className="font-bold text-xl">{activeCount}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-yellow-100">⏸️ Inactive</span>
//               <span className="font-bold text-xl">{inactiveCount}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-red-100">🚫 Blocked</span>
//               <span className="font-bold text-xl">{blockedCount}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from 'react'

const CustomerStats = () => {
  return (
    <div>
      
    </div>
  )
}

export default CustomerStats
