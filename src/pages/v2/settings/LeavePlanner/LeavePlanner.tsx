// import { useEffect, useRef, useState } from 'react'
// import SimpleButton from '../../../../components/V2/Button/SimpleButton'
// import SearchableDropdown from '../../../../components/V2/Form/SearchableDropdown'
// import { FormContainerV2 } from '../../assessment/TestPreview/subcomponents'
// import { Box, ButtonAllign, Flex, Text } from './StyledComponents'
// import {
//   bulkUploadHoliday,
//   getAllHolidays,
//   getAllInstituteAPI,
//   getSingleHoliday
// } from '../../../../helpers/V2/apis'
// import { CustomToastMessage } from '../../../../components/V2/ToastMessage'
// import {
//   FileContainer,
//   InnerContainer,
//   MessageContainer,
//   UploadFileMessageContainer
// } from '../../../../components/V2/FileDragAndDrop/styledComponents'
// import {
//   Anchor,
//   FileCircle,
//   MainMessage,
//   SuccessfulUploadMessage
// } from '../../assessment/studentBulkUpload/styledComponents'
// import File from '../../../../assets/File.png'
// import LeaveCalendar from './LeaveCalendar'

// const LeavePlanner = () => {
//   const [insLoading, setInsLoading] = useState(false)
//   const [instituteData, setInstituteData] = useState<any[]>([])
//   const [file, setFile] = useState<any>()
//   const [selectedInstitute, setSelectedInstitute] = useState<any>()
//   const onFileChange = (file: File) => {
//     return file
//   }
//   const handleFileSelect = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click()
//     }
//   }

//   const onChangeEvent = (event: any) => {
//     const { files } = event.target
//     onFileChange(files)
//     setFile(files[0])
//   }

//   const fileInputRef = useRef<HTMLInputElement>(null)

//   useEffect(() => {
//     let newInstitute: any = []
//     setInsLoading(true)
//     const payload = {
//       page: 1,
//       limit: 150
//     }
//     getAllInstituteAPI(payload)
//       .then((res: any) => {
//         newInstitute = res?.data?.map((item: any) => {
//           return {
//             id: item._id,
//             label: item.name
//           }
//         })
//         setInstituteData(newInstitute)
//       })
//       .catch((err: any) => CustomToastMessage(err.message, 'error'))
//       .finally(() => setInsLoading(false))
//   }, [])

//   useEffect(() => {
//     const payload = {
//       month: 1,
//       year: 2024
//     }
//     getAllHolidays(payload)
//       .then((res: any) => {
//         // newInstitute = res?.data?.map((item: any) => {
//         //   return {
//         //     id: item._id,
//         //     label: item.name
//         //   }
//         // })
//         // setInstituteData(newInstitute)
//         console.log(res)
//       })
//       .catch((err: any) => CustomToastMessage(err.message, 'error'))
//       .finally(() => setInsLoading(false))
//   }, [])

//   useEffect(() => {
//     getSingleHoliday({ id: '' }).then((res) => {
//       console.log(res?.data)
//     })
//   }, [])

//   const leaveData = [
//     { date: '2024-10-27T10:34:51.751Z', leaveType: 'Ramazan1' },
//     { date: '2024-10-22T10:34:51.751Z', leaveType: 'Ramazan2' },
//     {
//       date: '2024-10-30T10:34:51.751Z',
//       leaveType: 'Ramazan3 rgb(18, 109, 170)rgb(18, 109, 170)rgb(18, 109, 170)'
//     }
//   ]

//   const handleSubmit = () => {}

//   const formData = new FormData()
//   formData.append('file', file)
//   formData.append('isDefault', 'false')
//   formData.append('instituteId', String(selectedInstitute?.id))

//   const handleUpload = () => {
//     bulkUploadHoliday(formData)
//       .then((res: any) => {
//         if (res) {
//           CustomToastMessage(res.message, 'success')
//         }
//       })
//       .catch((error: any) => {
//         CustomToastMessage(error.message, 'error')
//       })
//   }

//   return (
//     <FormContainerV2 style={{ margin: '20px' }}>
//       <Flex style={{ justifyContent: 'flex-end' }}>
//         <SimpleButton
//           label={'View Planner'}
//           clickHandler={() => handleSubmit()}
//         />
//       </Flex>
//       <Flex
//         style={{ height: '100%', justifyContent: 'space-between', gap: '20px' }}
//       >
//         <Box>
//           <SearchableDropdown
//             style={{ width: '300px', marginTop: '6px' }}
//             isLoader={insLoading}
//             label={'Select Institute / School'}
//             placeHolder={'Please Select Institute / School'}
//             options={instituteData}
//             isClear={!!selectedInstitute?.id}
//             onSelect={(option) => {
//               setSelectedInstitute(option)
//             }}
//             selectedValue={selectedInstitute}
//           />
//           <Flex
//             style={{
//               flexDirection: 'column',
//               gap: '25px',
//               alignItems: 'center'
//             }}
//           >
//             <form
//               style={{
//                 width: '100%',
//                 display: 'flex',
//                 justifyContent: 'center'
//               }}
//             >
//               <input
//                 type="file"
//                 name="file"
//                 hidden
//                 ref={fileInputRef}
//                 onChange={onChangeEvent}
//               />
//               <FileContainer
//                 style={{ width: '50%' }}
//                 onClick={handleFileSelect}
//               >
//                 <InnerContainer>
//                   <FileCircle src={'/assets/images/excel.png'} alt="" />
//                   <MessageContainer>
//                     {file === undefined ? (
//                       <UploadFileMessageContainer>
//                         <MainMessage>Click to Select File</MainMessage>
//                       </UploadFileMessageContainer>
//                     ) : (
//                       <SuccessfulUploadMessage>
//                         {file?.name}
//                       </SuccessfulUploadMessage>
//                     )}
//                   </MessageContainer>
//                 </InnerContainer>
//               </FileContainer>
//             </form>
//             <ButtonAllign>
//               <SimpleButton
//                 label={'Upload'}
//                 clickHandler={() => handleUpload()}
//               />
//             </ButtonAllign>
//           </Flex>
//           <Flex style={{ alignItems: 'center', justifyContent: 'center' }}>
//             <Anchor
//               href={`${process.env.PUBLIC_URL}/StudyMaterialFormat.xlsx`}
//               download="StudyMaterial_Upload_Format.xlsx"
//             >
//               <img src={File} alt="File" height={'30px'} />
//             </Anchor>
//             <Text>Download Planner</Text>
//           </Flex>
//         </Box>
//         <LeaveCalendar leaveData={leaveData} />
//       </Flex>
//     </FormContainerV2>
//   )
// }

// export default LeavePlanner

// uncomment the above code for Leave Planner Changes

import styled from 'styled-components'
import { Blue } from '../../../../const/V2/stylingVariables'

const LeavePlanner = () => {
  return (
    <MenuBar>
      <Flex>
        <PageTitle>Coming Soon !</PageTitle>
      </Flex>
    </MenuBar>
  )
}

export default LeavePlanner

export const MenuBar = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
`
export const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;

  @media (max-width: 1450px) {
    display: block;
  }
`
export const PageTitle = styled.h6`
  color: ${Blue};
  font-family: DM Sans;
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.68px;
  margin-bottom: 0px;
  margin-right: 6px;

  @media (max-width: 992px) {
    font-size: 20px;
  }
`
