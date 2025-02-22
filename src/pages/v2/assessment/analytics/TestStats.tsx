import SearchInput from '../addQuestions/components/SearchInput'
import {
  Correct,
  FlexBetween,
  HeaderWrap,
  Heading,
  MainHeading,
  Min,
  Minutes,
  ProfileImage,
  Rank,
  Scroll,
  StatHead,
  StatList,
  StatPercen,
  SubHeading,
  TestPercent,
  UserTab
} from './styledComponents'
import { ReactComponent as RightIcon } from '../../../../assets/svg/DoubleTick.svg'
import { ReactComponent as WrongIcon } from '../../../../assets/svg/WrongMark.svg'
import UserImage from '../../../../assets/userImage.jpg'
import { ReactComponent as ClockIcon } from '../../../../assets/svg/AIClock.svg'

const TestStats = () => {
  return (
    <div style={{ margin: '30px', height: '100vh' }}>
      <HeaderWrap>
        <div style={{ marginBottom: '50px' }}>
          <MainHeading>Back to test stats</MainHeading>
        </div>
        <UserTab style={{ width: '30%', height: '60px', marginTop: '32px' }}>
          <SearchInput placeholder="Search Student by Name" />
        </UserTab>
      </HeaderWrap>
      <Heading>Test Statistics</Heading>
      <SubHeading>
        JEE Custom Test - Grade 6, Batch / Section - A, 3 Hours
      </SubHeading>
      <div
        style={{
          display: 'flex',
          marginTop: '30px',
          height: 'calc(100vh - 330px)'
        }}
      >
        <StatList>
          <FlexBetween
            style={{ width: '100%', padding: '0px 30px', marginBottom: '8px' }}
          >
            <StatHead color="#8288DD">Fully Attempted</StatHead>
            <StatPercen color="#8288DD">60%</StatPercen>
          </FlexBetween>
          <Scroll>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#5B72F8">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#5B72F8">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#5B72F8">80%</TestPercent>
            </Rank>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#5B72F8">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#5B72F8">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#5B72F8">80%</TestPercent>
            </Rank>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#5B72F8">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#5B72F8">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#5B72F8">80%</TestPercent>
            </Rank>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#5B72F8">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#5B72F8">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#5B72F8">80%</TestPercent>
            </Rank>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#5B72F8">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#5B72F8">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#5B72F8">80%</TestPercent>
            </Rank>
          </Scroll>
        </StatList>
        <StatList>
          <FlexBetween
            style={{ width: '100%', padding: '0px 30px', marginBottom: '8px' }}
          >
            <StatHead color="#3EC1EA">Half Attempted</StatHead>
            <StatPercen color="#3EC1EA">30%</StatPercen>
          </FlexBetween>
          <Scroll>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#3EC1EA">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#3EC1EA">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#3EC1EA">80%</TestPercent>
            </Rank>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#3EC1EA">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#3EC1EA">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#3EC1EA">80%</TestPercent>
            </Rank>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#3EC1EA">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#3EC1EA">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#3EC1EA">80%</TestPercent>
            </Rank>
            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#3EC1EA">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#3EC1EA">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#3EC1EA">80%</TestPercent>
            </Rank>

            <Rank>
              <div style={{ display: 'flex' }}>
                <ProfileImage src={UserImage} color="#c8ecf7" />
                <div>
                  <Min color="#3EC1EA">Akash P</Min>
                  <div style={{ display: 'flex', marginTop: '5px' }}>
                    <RightIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      10 correct
                    </Correct>
                    <WrongIcon style={{ marginRight: '5px' }} />
                    <Correct style={{ marginRight: '10px' }}>
                      4 incorrect
                    </Correct>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '10px'
                    }}
                  >
                    <ClockIcon
                      style={{
                        margin: '0px 5px 0px -2px',
                        height: '20px',
                        width: '20px'
                      }}
                    />
                    <Minutes color="#3EC1EA">20 minutes</Minutes>
                  </div>
                </div>
              </div>
              <TestPercent color="#3EC1EA">80%</TestPercent>
            </Rank>
          </Scroll>
        </StatList>
        <StatList>
          <FlexBetween
            style={{ width: '100%', padding: '0px 30px', marginBottom: '8px' }}
          >
            <StatHead color="#A3ACB9">Un Attempted</StatHead>
            <StatPercen color="#A3ACB9">10%</StatPercen>
          </FlexBetween>
          <Scroll>
            <Rank style={{ height: '70px', justifyContent: 'flex-start' }}>
              <ProfileImage src={UserImage} color="#cad0d9" />
              <Min color="#A3ACB9">Akash P</Min>
            </Rank>
            <Rank style={{ height: '70px', justifyContent: 'flex-start' }}>
              <ProfileImage src={UserImage} color="#cad0d9" />
              <Min color="#A3ACB9">Syed</Min>
            </Rank>
            <Rank style={{ height: '70px', justifyContent: 'flex-start' }}>
              <ProfileImage src={UserImage} color="#cad0d9" />
              <Min color="#A3ACB9">Markram</Min>
            </Rank>
            <Rank style={{ height: '70px', justifyContent: 'flex-start' }}>
              <ProfileImage src={UserImage} color="#cad0d9" />
              <Min color="#A3ACB9">Kumar</Min>
            </Rank>
            <Rank style={{ height: '70px', justifyContent: 'flex-start' }}>
              <ProfileImage src={UserImage} color="#cad0d9" />
              <Min color="#A3ACB9">Akash P</Min>
            </Rank>
            <Rank style={{ height: '70px', justifyContent: 'flex-start' }}>
              <ProfileImage src={UserImage} color="#cad0d9" />
              <Min color="#A3ACB9">Syed</Min>
            </Rank>
            <Rank style={{ height: '70px', justifyContent: 'flex-start' }}>
              <ProfileImage src={UserImage} color="#cad0d9" />
              <Min color="#A3ACB9">Markram</Min>
            </Rank>
          </Scroll>
        </StatList>
      </div>
    </div>
  )
}

export default TestStats
