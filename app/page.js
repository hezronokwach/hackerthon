import Navbar from "@/Components/Navbar/page"
import Link from "next/link"
 
function LandingPage() {
  return (
    <div>
<h1>Landing page</h1>
<Link href="/signup" className="nav-link">Sign In</Link>
<Link href="/login" className="nav-link">Log In</Link>
<Link href="/Hospital" className="nav-link">Hospital Dashboard</Link>
<Link href="/satelitteLogin" className="nav-link">Satelitte Log In</Link>
<Link href="/Regional" className="nav-link">Regional Dashboard</Link>
<Link href="/Satellite" className="nav-link">Satellite Dashboard</Link>
<Link href="/SavePulseAdmin" className="nav-link">SavePulse Administrator</Link>


<Link href="/satelitteSignUp" className="nav-link">Satelitte</Link>

    </div>
  
  )
}
 
export default LandingPage