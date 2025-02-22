import { useEffect, useState } from 'react'
import SimpleButton from '../../../../../components/V2/Button/SimpleButton'
import SearchableDropdown from '../../../../../components/V2/Form/SearchableDropdown'
import { SearchableDropdownOptionData } from '../../../../../components/V2/Form/types'
import {
  Flex,
  PageContainer
} from '../../../../../components/V2/styledComponents'
import { CustomToastMessage } from '../../../../../components/V2/ToastMessage'
import {
  getChapterData,
  getCourses,
  getSubjectData,
  getTopicData
} from '../../../../../helpers/V2/apis'
import {
  BlueBox,
  Fields,
  FullPage,
  Topic,
  TopicsList,
  UnitChapterHeading,
  UnitsChapterContainer
} from '../StyledComponents'
import {
  Checkbox,
  CheckboxContainer,
  FieldLabel
} from '../../studentSettings/styledComponents'
import { ReactComponent as CheckedSvg } from '../../../../../assets/svg/checked-checkbox.svg'
import { ReactComponent as UnCheckedSvg } from '../../../../../assets/svg/un-check-icon.svg'
import { Spinner } from 'react-bootstrap'
import { BlueButton } from '../../../../../const/V2/stylingVariables'
import moment from 'moment'

const LessonPlanPageThree = () => {
  const [selectedGrade, setSelectedGrade] =
    useState<SearchableDropdownOptionData>()
  const [selectedSubject, setSelectedSubject] =
    useState<SearchableDropdownOptionData>()
  const [subject, setSubject] = useState<any[]>([])
  const [subjectLoading, setSubjectLoading] = useState(false)
  const [gradeLoading, setGradeLoading] = useState(false)
  const [gradeData, setGradeData] = useState<any[]>([])

  const [chapterData, setChapterData] = useState<any[]>([])
  const [chapterLoading, setChapterLoading] = useState(false)
  const [selectedChapterId, setSelectedChapterId] =
    useState<SearchableDropdownOptionData>()

  const [topicLoading, setTopicLoading] = useState(false)
  const [topicData, setTopicsData] = useState<any[]>([])
  const [dragitems, setDragItems] = useState([])
  // Demonstration
  // Group Discussion
  // Presentation
  // Unit Test
  // Work Sheet
  // Class Discussion

  const [extraTopics, setExtraItem] = useState([
    { id: 'demonstration', name: 'Demonstration' },
    { id: 'groupDiscussion', name: 'Group Discussion' },
    { id: 'presentation', name: 'Presentation' },
    { id: 'unitTest', name: 'Unit Test' },
    { id: 'workSheet', name: 'Work Sheet' },
    { id: 'classDiscussion', name: 'Class Discussion' }
  ])

  useEffect(() => {
    let newGrade: any = []
    setGradeLoading(true)
    const payload = {
      page: 1,
      limit: 150
    }
    getCourses(payload)
      .then((res: any) => {
        newGrade = res?.data?.data?.map((item: any) => {
          return {
            id: item._id,
            label: item.name,
            value: ''
          }
        })
        setGradeData(newGrade)
      })
      .catch((err: any) => CustomToastMessage(err.message, 'error'))
      .finally(() => setGradeLoading(false))
  }, [])

  useEffect(() => {
    if (selectedGrade?.id) {
      setSubjectLoading(true)
      const payload = {
        page: 1,
        limit: 150,
        courseId: selectedGrade?.id
      }
      getSubjectData(payload)
        .then((res: any) => {
          const newSubject = res?.map((Subject: any) => {
            return {
              label: Subject.name,
              id: Subject?._id,
              value: ''
            }
          })
          setSubject(newSubject)
          if (res.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Grade',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setSubjectLoading(false))
    }
  }, [selectedGrade?.id])

  const getChapter = () => {
    if (selectedGrade?.id && selectedSubject?.id) {
      setChapterLoading(true)
      getChapterData({ limit: 120, page: 1, subjectId: selectedSubject?.id })
        .then((res: any) => {
          setChapterData(res?.data)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Subjects under this Grade',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setChapterLoading(false))
    }
  }

  useEffect(() => {
    if (selectedChapterId) {
      setTopicLoading(true)
      getTopicData({ limit: 120, page: 1, chapterId: selectedChapterId })
        .then((res: any) => {
          console.log(res?.data, 'ddfsdf')
          setTopicsData(res?.data)
          if (res.data.length <= 0) {
            CustomToastMessage(
              'There are no Topics under this chapter',
              'error'
            )
          }
        })
        .catch((err: any) => CustomToastMessage(err.message, 'error'))
        .finally(() => setTopicLoading(false))
    }
  }, [selectedChapterId])

  // Handle drag start
  const handleDragStart = (e: any, item: any) => {
    e.dataTransfer.setData('id', item._id)
  }

  const handleDragStart2 = (e: any, item: any) => {
    e.dataTransfer.setData('id', item.id)
  }

  // Handle drop
  const handleDrop = (e: any) => {
    e.preventDefault()
    const newdraggedItem: any = [...dragitems]
    const draggedItemId = e.dataTransfer.getData('id')

    const draggedItem: any = topicData.find(
      (item: any) => item?._id === draggedItemId
    )
    if (draggedItem) {
      console.log(draggedItem, 'draggedItem')

      newdraggedItem.push(draggedItem)
      setDragItems(newdraggedItem)
      const newItems = topicData.filter(
        (item) => item?._id !== draggedItem?._id
      )
      setTopicsData(newItems)
    }

    const draggedItemExtra: any = extraTopics.find(
      (item: any) => item?.id === draggedItemId
    )
    if (draggedItemExtra) {
      console.log(draggedItemExtra, 'draggedItemExtra')
      const newItems = extraTopics.filter(
        (item) => item?.id !== draggedItemExtra.id
      )
      setExtraItem(newItems)

      newdraggedItem.push(draggedItemExtra)
      console.log(newdraggedItem, 'newdraggedItem')

      setDragItems(draggedItemExtra)
    }
  }
  console.log(dragitems, 'dragitems')

  // Allow drop by preventing the default behavior
  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  return (
    <PageContainer>
      <FullPage>
        <Flex gap="10px" wrap alignItems="end">
          <SearchableDropdown
            style={{ width: '290px' }}
            isLoader={gradeLoading}
            label={'Select Grade'}
            placeHolder={'Please Select Grade'}
            options={gradeData}
            isClear={selectedGrade?.id ? true : false}
            onSelect={(option) => {
              setSelectedGrade(option)
              setSubject([])
              setSelectedSubject({ id: '', label: '', value: '' })
            }}
            selectedValue={selectedGrade}
          />
          <SearchableDropdown
            style={{ width: '280px' }}
            isLoader={subjectLoading}
            label="Select Subject"
            placeHolder="Please Select Subject"
            options={subject}
            isClear={selectedSubject?.id ? true : false}
            onSelect={(data: any) => {
              setSelectedSubject(data)
            }}
            selectedValue={selectedSubject}
          />
          <SimpleButton label="Submit" clickHandler={() => getChapter()} />
        </Flex>

        <Flex gap="10px" wrap style={{ marginTop: '10px' }} alignItems="start">
          <UnitsChapterContainer>
            <UnitChapterHeading>Unit & chapters</UnitChapterHeading>
            {chapterLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Spinner
                  style={{
                    width: '44px',
                    height: '44px',
                    color: `${BlueButton}`,
                    marginTop: '20px'
                  }}
                  animation={'border'}
                />
              </div>
            )}
            {chapterData &&
              chapterData.length > 0 &&
              chapterData?.map((item: any, index: any) => (
                <Fields key={`key_${index}`}>
                  <CheckboxContainer
                    className="d-flex justify-content-center"
                    onClick={() => setSelectedChapterId(item?._id)}
                    onKeyDown={() => setSelectedChapterId(item?._id)}
                    role="button" // Adding role="button" to indicate this is an interactive element
                    tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
                  >
                    <Checkbox>
                      {selectedChapterId === item?._id ? (
                        <CheckedSvg />
                      ) : (
                        <UnCheckedSvg />
                      )}
                    </Checkbox>
                  </CheckboxContainer>{' '}
                  <FieldLabel>{item?.name}</FieldLabel>{' '}
                </Fields>
              ))}
          </UnitsChapterContainer>

          <UnitsChapterContainer>
            <UnitChapterHeading>Topics & sub topics</UnitChapterHeading>
            {topicLoading && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Spinner
                  style={{
                    width: '44px',
                    height: '44px',
                    color: `${BlueButton}`,
                    marginTop: '20px'
                  }}
                  animation={'border'}
                />
              </div>
            )}

            <TopicsList>
              {topicData &&
                topicData.length > 0 &&
                topicData?.map((item: any, index: any) => (
                  <Topic
                    key={`key_${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    {item?.name}
                  </Topic>
                ))}
              {/* <SubTopic> topic 3 </SubTopic> */}
            </TopicsList>
          </UnitsChapterContainer>
          <UnitsChapterContainer
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <UnitChapterHeading>
              {' '}
              {moment(new Date()).format('DD MMM, YYYY')}
            </UnitChapterHeading>

            <TopicsList>
              {dragitems &&
                dragitems.length > 0 &&
                dragitems?.map((item: any, index: any) => (
                  <Topic
                    key={`key_${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    {item?.name}
                  </Topic>
                ))}
            </TopicsList>
          </UnitsChapterContainer>
          <UnitsChapterContainer>
            <TopicsList>
              {extraTopics &&
                extraTopics?.map((item: any, index: any) => (
                  <BlueBox
                    key={`key_${index}`}
                    draggable
                    onDragStart={(e) => handleDragStart2(e, item)}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                  >
                    {item?.name}
                  </BlueBox>
                ))}
            </TopicsList>
            {/* <BlueBox> topic 3 </BlueBox> */}
          </UnitsChapterContainer>
        </Flex>
      </FullPage>
    </PageContainer>
  )
}
export default LessonPlanPageThree

// import React, { useState } from "react";

// const LessonPlanPageThree = () => {
//   const [items, setItems] = useState([
//     { id: 1, name: "Item 1" },
//     { id: 2, name: "Item 2" },
//     { id: 3, name: "Item 3" },
//   ]);

//   const [dragitems, setDragItems] = useState([]);
//   // Handle drag start
//   const handleDragStart = (e: any, item: any) => {
//     e.dataTransfer.setData("itemId", item.id);
//   };

//   // Handle drop
//   const handleDrop = (e: any) => {
//     e.preventDefault();
//     const newdraggedItem: any = [...dragitems]
//     const draggedItemId = e.dataTransfer.getData("itemId");
//     const draggedItem: any = items.find((item) => item.id ===  parseInt(draggedItemId, 10));
//     console.log(draggedItem)

//     newdraggedItem.push(draggedItem)
//     setDragItems(newdraggedItem)
//     const newItems = items.filter((item) => item.id !==  draggedItem?.id)
//     setItems(newItems)
//   };

//   // Allow drop by preventing the default behavior
//   const handleDragOver = (e: any) => {
//     e.preventDefault();
//   };

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       <div
//         style={{ border: "1px solid black", padding: "10px", width: "200px" }}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//         onKeyDown={() => {}}
//         role="button" // Adding role="button" to indicate this is an interactive element
//         tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
//       >
//         <h3>Drop here</h3>
//         {dragitems.map((item: any) => (
//           <div
//             key={item?.id}
//             draggable
//             onDragStart={(e) => handleDragStart(e, item)}
//             onKeyDown={() => {}}
//             role="button" // Adding role="button" to indicate this is an interactive element
//             tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
//             style={{
//               padding: "8px",
//               border: "1px solid black",
//               marginBottom: "8px",
//               cursor: "move",
//             }}
//           >
//             {item?.name || ''}
//           </div>
//         ))}
//       </div>

//       <div>
//         <h3>Draggable Items</h3>
//         {items.map((item) => (
//           <div
//             key={item.id}
//             draggable
//             onDragStart={(e) => handleDragStart(e, item)}
//             onKeyDown={() => {}}
//             role="button" // Adding role="button" to indicate this is an interactive element
//             tabIndex={0} // Adding tabIndex={0} to make it focusable and interactive
//             style={{
//               padding: "8px",
//               border: "1px solid black",
//               marginBottom: "8px",
//               cursor: "move",
//             }}
//           >
//             {item.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LessonPlanPageThree;
