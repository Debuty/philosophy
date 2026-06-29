
import './EmptyState.scss'

interface EmptyStateProps {
    DataName: string
}

export const EmptyState = ({DataName}:EmptyStateProps) => {
  return (
    <div className='EmptyState'>There is no {DataName} to show  </div>
  ) 
}