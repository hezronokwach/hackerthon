// Example usage in a page or layout component
import SideNav4 from '@/Components/SideNav4/page';

export default function Layout({ children }) {
   return (
       <div className="flex">
           <SideNav4/>
           <main className="flex-grow">{children}</main>
       </div>
   );
}
