import React from 'react'
import { useSelector } from 'react-redux'
import { ActionIcon, Container, Group, Menu, Stack, Text, Title } from '@mantine/core'
import { selectTasksList } from '../features/tasks/taskSlice'
import { DEFAULT_SECTION_ID } from '../features/tasks/sectionSlice'
import { getCountStats } from '../utils/stateModifiers'
import { ClearAll, Dots } from 'tabler-icons-react'
import List from './components/List/List'

const HomePage = () => {
  const taskList = useSelector((state) => selectTasksList(state, DEFAULT_SECTION_ID))
  const {count, doneCount} = getCountStats(taskList);

  return (
    <Container fluid py={'md'}>
      <Group position='apart'>
        <Stack spacing={0} justify="flex-start">
          <Title order={3}>Quick List</Title>
          <Text size={'sm'} color={'dimmed'}><>{doneCount}/{count}</></Text>
        </Stack>
        <Menu
          withinPortal
        >
          <Menu.Target>
            <ActionIcon variant='transparent'><Dots /></ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<ClearAll />}>Clear List</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <List taskList={taskList} activeSection={DEFAULT_SECTION_ID} />
    </Container>
  )
}

export default HomePage;