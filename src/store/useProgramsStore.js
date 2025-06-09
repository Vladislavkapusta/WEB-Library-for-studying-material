import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useProgramsStore = defineStore('programs', () => {
  // Загрузка данных из localStorage или инициализация начальными данными
  const loadDisciplines = () => {
    const savedData = localStorage.getItem('disciplines')
    return savedData ? JSON.parse(savedData) : [
      {
        title: 'HTML, CSS',
        attributes: ['IT', 'Артефакты'],
        programs: [
          {
            id: 1,
            title: 'Введение',
            attributes: ['Easy'],
            sections: [{ text: 'Введение в HTML и CSS' }],
            media: [],
          },
          {
            id: 2,
            title: 'Семантические теги',
            attributes: ['Normal'],
            sections: [{ text: 'Значение семантических тегов' }],
            media: [],
          },
          {
            id: 3,
            title: 'Подключение стилей',
            attributes: ['Normal'],
            sections: [{ text: 'Способы подключения CSS' }],
            media: [],
          },
          {
            id: 4,
            title: 'Анимации',
            attributes: ['Hard'],
            sections: [{ text: 'Создание анимаций на CSS' }],
            media: [],
          },
        ],
      },
      {
        title: 'JavaScript',
        attributes: ['IT', 'Артефакты'],
        programs: [
          {
            id: 5,
            title: 'Основы JavaScript',
            attributes: ['Easy'],
            sections: [{ text: 'Переменные, типы данных' }],
            media: [],
          },
          {
            id: 6,
            title: 'Функции и замыкания',
            attributes: ['Normal'],
            sections: [{ text: 'Как работают функции' }],
            media: [],
          },
        ],
      },
    ]
  }

  const disciplines = ref(loadDisciplines())

  // Сохранение данных в localStorage при изменении
  watch(disciplines, (newValue) => {
    localStorage.setItem('disciplines', JSON.stringify(newValue))
  }, { deep: true })

  // Получение программ по дисциплине
  const getProgramsByDiscipline = (disciplineTitle) => {
    const discipline = disciplines.value.find((d) => d.title === disciplineTitle)
    return discipline ? discipline.programs : []
  }

  // Добавление программы в дисциплину
  const addProgram = (disciplineTitle, newProgram) => {
    let discipline = disciplines.value.find((d) => d.title === disciplineTitle)
    if (!discipline) {
      discipline = { title: disciplineTitle, attributes: ['IT'], programs: [] }
      disciplines.value.push(discipline)
    }
    discipline.programs.push({
      id: newProgram.id || Date.now(),
      title: newProgram.title,
      attributes: newProgram.attributes || [],
      sections: newProgram.sections || [],
      media: newProgram.media || [],
    })
  }

  // Удаление программы
  const deleteProgram = (disciplineTitle, id) => {
    const discipline = disciplines.value.find((d) => d.title === disciplineTitle)
    if (discipline) {
      discipline.programs = discipline.programs.filter((program) => program.id !== id)
    }
  }

  // Редактирование программы
  const editProgram = (disciplineTitle, updatedProgram) => {
    const discipline = disciplines.value.find((d) => d.title === disciplineTitle)
    if (discipline) {
      const index = discipline.programs.findIndex((program) => program.id === updatedProgram.id)
      if (index !== -1) {
        discipline.programs[index] = {
          ...updatedProgram,
          media: updatedProgram.media || [],
        }
      }
    }
  }

  // Редактирование дисциплины
  const editDiscipline = (oldTitle, updatedDiscipline) => {
    const index = disciplines.value.findIndex((d) => d.title === oldTitle)
    if (index !== -1) {
      disciplines.value[index] = {
        ...disciplines.value[index],
        ...updatedDiscipline,
        title: updatedDiscipline.title,
      }
    }
  }

  return {
    disciplines,
    getProgramsByDiscipline,
    addProgram,
    deleteProgram,
    editProgram,
    editDiscipline,
  }
})