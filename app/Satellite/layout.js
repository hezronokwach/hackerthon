// Example usage in a page or layout component
import SideNav2 from '@/Components/SideNav2/page';

export default function Layout({ children }) {
   return (
       <div className="flex">
           <SideNav2 />
           <main className="flex-grow">{children}</main>
       </div>
   );
}
