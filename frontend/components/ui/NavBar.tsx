"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HomeIcon, StatIcon, CategoryIcon, TransactionIcon, BudgetIcon } from "./icons/Icon";


type NavItem = {
  href: string;
  Icon: React.ElementType;
};

const navItems: NavItem[] = [
  { href: "/home", Icon: HomeIcon },
  { href: "/stat", Icon: StatIcon },
  { href: "/category", Icon: CategoryIcon },
  { href: "/transaction", Icon: TransactionIcon },
  { href: "/budget", Icon: BudgetIcon },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 px-9.5 py-4 bg-white">
      <div className="flex gap-11 justify-center bg-white">
        {navItems.map((item: NavItem) => {
        const { Icon } = item;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Icon className={isActive ? "text-navbar-active" : "text-navbar-inactive"} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

//     <div className="px-9.5 py-4 bg-white">
//   <div className="flex gap-11 justify-center bg-white">
//     <img src="/material-symbols_home-rounded.svg" alt="" />
//     <img src="/lets-icons_chart-fill.svg" alt="" />
//     <img src="/ic_round-pie-chart.svg" alt="" />
//     <img src="/solar_list-bold.svg" alt="" />
//     <img src="/material-symbols_money-bag-rounded.svg" alt="" />
//   </div>
// </div>
