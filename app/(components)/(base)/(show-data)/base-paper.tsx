interface BasePaperProps {
  title: string
  subtitle: string | React.ReactNode
}

export const BasePaper = ({ title, subtitle }: BasePaperProps) => {
  return (
    <div className="p-4 rounded-lg bg-muted/50 border">
      <h3 className="text-lg font-medium">{title}</h3>
      {typeof subtitle === 'string' ? (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      ) : (
        subtitle
      )}
    </div>
  )
}
