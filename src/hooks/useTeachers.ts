import { useState, useEffect } from 'react'
import { 
  getTeachersBySubject, 
  getTeacherSettings,
  generateSubjectsArray,
  type TeacherDisplay,
  type TeachersBySubject,
  type TeacherSettings
} from '@/services/teacherService'

interface UseTeachersReturn {
  teachersData: TeachersBySubject
  teacherSettings: TeacherSettings | null
  subjects: Array<{ key: string; name: string; color: string }>
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// Fallback data untuk testing
const fallbackTeachersData: TeachersBySubject = {
  informatika: [
    {
      name: 'Syaifullah, S.Pd.',
      image: '/guru/syaifullah.jpg',
      position: 'Guru Mapel IPA & Informatika',
      description: 'Guru Mapel Informatika SMP Muhammadiyah Al Kautsar PK Kartasura',
      subject: 'Informatika'
    },
    {
      name: 'Adira Bintang Permana, S.Pd.',
      image: '/guru/adira.jpg',
      position: 'Guru Mapel Informatika',
      description: 'Spesialis dalam pemrograman dan teknologi informasi',
      subject: 'Informatika'
    }
  ],
  matematika: [
    {
      name: 'Dr. Ahmad Susanto, M.Pd.',
      image: '/guru/ahmad.jpg',
      position: 'Guru Matematika Senior',
      description: 'Berpengalaman 15 tahun dalam mengajar matematika dengan metode pembelajaran inovatif',
      subject: 'Matematika'
    }
  ],
  bahasa_indonesia: [
    {
      name: 'Prof. Bambang Sutrisno, M.Pd.',
      image: '/guru/bambang.jpg',
      position: 'Guru Bahasa Indonesia Senior',
      description: 'Ahli dalam sastra Indonesia dan penulisan kreatif dengan pengalaman mengajar lebih dari 20 tahun',
      subject: 'Bahasa Indonesia'
    }
  ]
}

const fallbackTeacherSettings: TeacherSettings = {
  title: 'Tim Guru Profesional SMP Muhammadiyah Al Kautsar PK Kartasura',
  subtitle: 'Tenaga pengajar berkualitas dengan dedikasi tinggi untuk pendidikan terbaik dan pembentukan karakter Islami.',
  banner_desktop: '/guru/Adam-Muttaqien-M.Si_.jpg',
  banner_mobile: '/guru/Cindy-Trisnawati-S.Pd-M.Pd_.jpg',
  date: '17 Juli 2025',
  read_time: '5 Menit untuk membaca',
  author: 'Tim Humas SMP'
}

export const useTeachers = (): UseTeachersReturn => {
  const [teachersData, setTeachersData] = useState<TeachersBySubject>({})
  const [teacherSettings, setTeacherSettings] = useState<TeacherSettings | null>(null)
  const [subjects, setSubjects] = useState<Array<{ key: string; name: string; color: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTeachersData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch teachers data
      const teachersData = await getTeachersBySubject()
      setTeachersData(teachersData)
      
      // Fetch teacher settings
      const settings = await getTeacherSettings()
      setTeacherSettings(settings)
      
      // Generate subjects array from API data
      const subjectsArray = generateSubjectsArray(teachersData)
      setSubjects(subjectsArray)
      
    } catch (err) {
      console.error('API Error:', err)
      
      // Fallback ke data sample jika API tidak tersedia
      console.log('Using fallback data for testing...')
      setTeachersData(fallbackTeachersData)
      setTeacherSettings(fallbackTeacherSettings)
      
      // Generate subjects array from fallback data
      const subjectsArray = generateSubjectsArray(fallbackTeachersData)
      setSubjects(subjectsArray)
      
      setError('Menggunakan data sample - Backend belum tersedia')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeachersData()
  }, [])

  return {
    teachersData,
    teacherSettings,
    subjects,
    loading,
    error,
    refetch: fetchTeachersData
  }
} 