import Navbar from "@/Components/Navbar/page"
import Link from "next/link"
 
function LandingPage() {
  return (
    <div>
<h1>Landing page</h1>
<Link href="/signup" className="nav-link">Donor Sign Up</Link>
<Link href="/login" className="nav-link">Donor Log In</Link>
<Link href="/satelitteLogin" className="nav-link">Satelitte Log In</Link>
<Link href="/satelitteDashboard/add" className="nav-link">Donor Details</Link>

<Link href="/satelitteSignUp" className="nav-link">Satelitte Sign up</Link>

    </div>
  
  )
}
 
export default LandingPage