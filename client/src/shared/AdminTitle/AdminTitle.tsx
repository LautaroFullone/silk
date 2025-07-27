interface AdminTitleProps {
   title: string
   description: string
}
const AdminTitle = ({ title, description }: AdminTitleProps) => {
   return (
      <div>
         <h1 className="text-4xl font-serif text-gray-900 mb-2">{title}</h1>
         <p className="text-muted-foreground">{description}</p>
      </div>
   )
}
export default AdminTitle
