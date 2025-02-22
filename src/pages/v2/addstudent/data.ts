export const Gender = [
  { id: '1', label: 'male', value: 'male' },
  { id: '2', label: 'female', value: 'female' }
]

export const BloodGroup = [
  { id: '1', label: 'O+', value: 'O+' },
  { id: '2', label: 'O-', value: 'O-' },
  { id: '3', label: 'A+', value: 'A+' },
  { id: '4', label: 'A-', value: 'A-' },
  { id: '5', label: 'B+', value: 'B+' },
  { id: '6', label: 'B-', value: 'B-' },
  { id: '7', label: 'AB+', value: 'AB+' },
  { id: '8', label: 'AB-', value: 'AB-' },
  { id: '9', label: 'other', value: 'other' }
]
export const sampleOptions = Array.from(
  { length: new Date().getFullYear() - 2024 + 20 },
  (_, index) => {
    const year = 2024 + index
    return {
      id: String(index + 1),
      label: ` ${year}-${year + 1}`,
      value: String(year)
    }
  }
)

export const yearsOfExperience = [
  { id: '1', label: '<1', value: '<1' },
  { id: '2', label: '1', value: '1' },
  { id: '3', label: '2', value: '2' },
  { id: '4', label: '3', value: '3' },
  { id: '5', label: '4', value: '4' },
  { id: '6', label: '5', value: '5' },
  { id: '7', label: '6', value: '6' },
  { id: '8', label: '7', value: '7' },
  { id: '9', label: '8', value: '8' },
  { id: '10', label: '9', value: '9' },
  { id: '11', label: '10', value: '10' },
  { id: '12', label: '11', value: '11' },
  { id: '13', label: '12', value: '12' },
  { id: '14', label: '13', value: '13' },
  { id: '15', label: '14', value: '14' },
  { id: '16', label: '15', value: '15' },
  { id: '17', label: '16', value: '16' },
  { id: '18', label: '17', value: '17' },
  { id: '19', label: '18', value: '18' },
  { id: '20', label: '19', value: '19' },
  { id: '21', label: '20', value: '20' },
  { id: '21', label: '21', value: '21' },
  { id: '23', label: '22', value: '22' },
  { id: '24', label: '23', value: '23' },
  { id: '25', label: '24', value: '24' },
  { id: '26', label: '25', value: '25' },
  { id: '27', label: '26', value: '26' },
  { id: '28', label: '27', value: '27' },
  { id: '29', label: '28', value: '28' },
  { id: '30', label: '29', value: '29' },
  { id: '31', label: '30', value: '30' },
  { id: '32', label: '>30', value: '>30' }
]

export const TypeOfContract = [
  { id: '1', label: 'Regular', value: 'Regular' },
  { id: '2', label: 'Contract', value: 'Contract' }
]
export const RegistrationType = [
  { id: '1', label: 'New Registration', value: 'New Registration' },
  { id: '2', label: 'Re-Registration', value: 'Re-Registration' }
]

export const StudentCommunity = [
  { id: '1', label: 'Cat I', value: 'Cat I' },
  { id: '2', label: 'Cat II', value: 'Cat II' },
  { id: '3', label: 'GM', value: 'GM' },
  { id: '4', label: 'II A', value: 'II A' },
  { id: '5', label: 'II B', value: 'II B' },
  { id: '6', label: 'III A', value: 'III A' },
  { id: '7', label: 'III B', value: 'III B' },
  { id: '8', label: 'OBC', value: 'OBC' },
  { id: '9', label: 'Others', value: 'Others' },
  { id: '10', label: 'SC', value: 'SC' },
  { id: '11', label: 'SIKH', value: 'SIKH' },
  { id: '12', label: 'ST', value: 'ST' }
]

export const StudentCast = [
  { id: '1', label: 'Kurubas', value: 'Kurubas' },
  { id: '2', label: 'Lingayats', value: 'Lingayats' },
  { id: '3', label: 'Nadar', value: 'Nadar' },
  { id: '4', label: 'Others', value: 'Others' },
  { id: '5', label: 'Reddy', value: 'Reddy' },
  { id: '6', label: 'Udaiyar', value: 'Udaiyar' },
  { id: '7', label: 'Vanniar', value: 'Vanniar' },
  { id: '8', label: 'Vokkaligas', value: 'Vokkaligas' },
  { id: '9', label: 'Yadavar', value: 'Yadavar' },
  { id: '10', label: 'Adi Dravida', value: 'Adi Dravida' },
  { id: '11', label: 'Adi Karnataka', value: 'Adi Karnataka' },
  { id: '12', label: 'Brahmin', value: 'Brahmin' },
  { id: '13', label: 'Devanagar', value: 'Devanagar' },
  { id: '14', label: 'Dhobi', value: 'Dhobi' },
  { id: '15', label: 'Gowdas', value: 'Gowdas' },
  { id: '16', label: 'Iyengar', value: 'Iyengar' },
  { id: '17', label: 'Jain communities', value: 'Jain communities' }
]
export const StudentReligion = [
  { id: '1', label: 'Hindu', value: 'Hindu' },
  { id: '2', label: 'Muslim', value: 'Muslim' },
  { id: '3', label: 'Christian', value: 'Christian' },
  { id: '4', label: 'Buddhist', value: 'Buddhist' },
  { id: '5', label: 'Jain', value: 'Jain' },
  { id: '6', label: 'Sikh', value: 'Sikh' },
  { id: '7', label: 'Others', value: 'Others' }
]
