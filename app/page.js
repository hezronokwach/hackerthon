import Navbar from "@/Components/Navbar/page"
import Link from "next/link"
 
function LandingPage() {
  return (
    <div>
<h1>Landing page</h1>
<Link href="/signup" className="nav-link">Sign In</Link>
<Link href="/login" className="nav-link">Log In</Link>
<Link href="/satelitteLogin" className="nav-link">Satelitte Log In</Link>


<Link href="/satelitteSignUp" className="nav-link">Satelitte</Link>

    </div>
  
  )
}
 
export default LandingPage