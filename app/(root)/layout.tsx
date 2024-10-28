import Navbar from "@/components/Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

function layout({ children }: Readonly<LayoutProps>) {
    return ( 
        <main className="font-work-sans">
            <Navbar />
            {children}
        </main>
     );
}

export default layout;