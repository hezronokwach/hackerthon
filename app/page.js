import Navbar from "@/Components/Navbar/page"
import Link from "next/link"
 
function LandingPage() {
  return (
    <div>
<h1>Landing page</h1>
<Link href="/signin" className="nav-link">Sign In</Link>
    </div>
  
  )
}
 
export default LandingPage