import { DocButton } from '../styledComponent'

export const DocumentIcon = ({
  color,
  onClick
}: {
  color?: any
  onClick?: any
}) => {
  return (
    <DocButton onClick={onClick}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15"
            stroke="#333333"
          />
          <path
            d="M13 3H11C9.89543 3 9 3.89543 9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5C15 3.89543 14.1046 3 13 3Z"
            stroke="#333333"
          />
        </g>
        <defs>
          <clipPath id="clip0_1023_6254">
            <rect width="24" height="24" fill={color || '#FF374E'} />
          </clipPath>
        </defs>
      </svg>
    </DocButton>
  )
}
