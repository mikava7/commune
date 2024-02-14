import ProductSidebar from '@/components/ui/products/sidebar'

export default function ProductLayout({children}:{children:React.ReactNode}){

        return(
                <section className='flex'>
                <ProductSidebar >
                </ProductSidebar>
                {children}
                </section>
        )
}