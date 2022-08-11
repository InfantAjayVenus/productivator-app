import React from 'react';
import { ActionIcon, List, TextInput, Text, Card, Group, ThemeIcon, Container, ScrollArea } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { ChevronRight, Plus } from 'tabler-icons-react';
import { useForm } from '@mantine/form';
import { addSection, selectSectionList } from '../features/tasks/sectionSlice';

function TaskSections() {
  const dispatch = useDispatch();
  const sectionForm = useForm({
    initialValues: {
      sectionName: ''
    },
    validate: {
      sectionName: (value) => value === '' ? 'Section Name should not be empty' : null
    }
  })
  const sectionsList = useSelector(selectSectionList);
  return (
    <Container p={'md'}>
      <form
        onSubmit={sectionForm.onSubmit(({ sectionName }) => {
          dispatch(addSection(sectionName));
          sectionForm.reset();
        })}
      >
        <TextInput
          {...sectionForm.getInputProps("sectionName")}
          placeholder="Enter Section Name..."
          style={{ width: "100%", padding: "0.25rem 0rem" }}
          rightSection={<ActionIcon variant={"light"} type={"submit"}>
            <Plus />
          </ActionIcon>}
          required />
      </form>
      <ScrollArea.Autosize maxHeight={'72.5vh'}>
        <List listStyleType={'none'} px={'xs'} style={{ width: '100%' }}>
          {sectionsList.map(sectionItem => (
            <List.Item
              key={sectionItem.id as React.Key}
              my={'md'}
              style={{ width: '100%' }}>
              <Card component={Link} to={`/tasks/${sectionItem.id}`} style={{borderLeft: `0.25rem solid ${sectionItem.accent || 'gray'}`}}>
                <Group position='apart'>
                  <Text weight={'600'} transform={'capitalize'} >{sectionItem.name}</Text>
                  <ThemeIcon variant='light' color={'gray'}><ChevronRight /* color={sectionItem.accent} */ /> </ThemeIcon>
                </Group>
              </Card>
            </List.Item>
          ))}
        </List>
      </ScrollArea.Autosize>
      <Outlet />
    </Container>
  )
}

export default TaskSections