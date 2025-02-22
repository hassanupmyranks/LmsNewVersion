import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { DropdownWrapper, DropdownMenu, DropdownItem } from './styleComponents'
import { ButtonV2 } from '../../../../components/V2/styledComponents'

type Option = {
  label: string
  action: () => void
}

type DownloadDropdownProps = {
  options: Option[]
}

const DownloadDropdown = ({ options }: DownloadDropdownProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  const handleOptionClick = (option: Option) => {
    if (typeof option.action === 'function') {
      option.action()
    }
    setShowMenu(false)
  }

  return (
    <DropdownWrapper ref={dropdownRef}>
      <ButtonV2 onClick={() => setShowMenu((prev) => !prev)} filled>
        Download
      </ButtonV2>
      {showMenu && (
        <DropdownMenu show={showMenu}>
          {options.map((option) => (
            <DropdownItem
              key={option.label}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownWrapper>
  )
}

DownloadDropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired
    }).isRequired
  ).isRequired
}

DownloadDropdown.defaultProps = {
  options: []
}

export default DownloadDropdown
