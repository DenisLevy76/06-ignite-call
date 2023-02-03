import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import {
  IntervalDay,
  IntervalInputsGroup,
  IntervalItem,
  IntervalsList,
  TimesIntervalsBox,
  TimesIntervalsPageContainer,
} from '../../../styles/pages/time-intervals-styles'
import { ArrowRight } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useFieldArray, useForm, Controller } from 'react-hook-form'
import { getWeekDays } from '../../../utils/getWeekOfDays'
import { HelperText } from '../../../components/FormUsernameRegister/_styles'
import { convertTimeStringToMinutes } from '../../../utils/convertTimeStringToMinutes'
import { api } from '../../../lib/axios'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const timesIntervalsFormSchema = zod.object({
  intervals: zod
    .array(
      zod.object({
        weekDay: zod.number().min(0).max(6),
        enabled: zod.boolean(),
        startTime: zod.string(),
        endTime: zod.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine(
      (intervals) => intervals.length > 0,
      'Você precisa selecionar pelo menos 1 dia da semana.',
    )
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) =>
        intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 > interval.startTimeInMinutes,
        ),
      'A hora de termino deve ser pelo menos 1 hora após o inicio.',
    ),
})

type TimesIntervalsInputs = zod.input<typeof timesIntervalsFormSchema>
type TimesIntervalsOutput = zod.output<typeof timesIntervalsFormSchema>

const TimesIntervals: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
    control,
  } = useForm<TimesIntervalsInputs>({
    resolver: zodResolver(timesIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 1,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 2,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 3,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 4,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 5,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 6,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
      ],
    },
  })

  const router = useRouter()

  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })

  const handleSetTimeIntervals = async (timesIntervals: any) => {
    const formData = timesIntervals as TimesIntervalsOutput

    try {
      await api.post('/users/time-intervals', {
        ...formData,
      })

      router.push('/register/update-profile')
    } catch (error: any) {
      alert(error.message)
      router.push('/register')
    }
  }

  return (
    <>
      <NextSeo title="Registro 3/4 | Ignite Call" noindex />
      <TimesIntervalsPageContainer>
        <header>
          <Heading as="strong">Quase lá</Heading>
          <Text css={{ color: '$gray200' }}>
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </Text>

          <MultiStep size={4} currentStep={3} />
        </header>
        <TimesIntervalsBox
          as="form"
          onSubmit={handleSubmit(handleSetTimeIntervals)}
        >
          <IntervalsList>
            {fields.map((field) => (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${field.weekDay}.enabled`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                        checked={field.value}
                      />
                    )}
                  />
                  <Text>{getWeekDays()[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputsGroup>
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${field.weekDay}.startTime`)}
                    disabled={!intervals[field.weekDay].enabled}
                  />
                  <TextInput
                    size="sm"
                    type="time"
                    step={60}
                    {...register(`intervals.${field.weekDay}.endTime`)}
                    disabled={!intervals[field.weekDay].enabled}
                  />
                </IntervalInputsGroup>
              </IntervalItem>
            ))}
          </IntervalsList>
          {errors.intervals?.message && (
            <HelperText>{errors.intervals.message}</HelperText>
          )}
          <Button type="submit" disabled={isSubmitting}>
            Próximo passo <ArrowRight size={24} />
          </Button>
        </TimesIntervalsBox>
      </TimesIntervalsPageContainer>
    </>
  )
}

export default TimesIntervals
