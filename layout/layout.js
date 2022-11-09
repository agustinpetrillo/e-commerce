import Background from "../components/Background"
import Footer from "../components/Section/Footer"
import Navbar from "../components/Section/Navbar"

const layout = ({ children }) => {
    return (
        <>
            <Background className="bg-all">
                <Navbar />
                {children}
                <Footer />
            </Background>
        </>
    )
}

export default layout