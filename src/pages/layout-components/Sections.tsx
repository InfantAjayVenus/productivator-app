import { ActionIcon, List, TextInput, UnstyledButton } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Plus } from 'tabler-icons-react';
import { addSection, selectActiveSection, selectSectionList, setActiveSection } from '../../features/tasks/sectionSlice';
import { useForm } from '@mantine/form';

function TaskSections({ close }) {
  const dispatch = useDispatch();
  const sectionForm = useForm({
    initialValues: {
      sectionName: ''
    },
    validate: {
      sectionName: (value) => value === '' ? 'Section Name should not be empty' : null
    }
  })
  const activeSection = useSelector(selectActiveSection);
  const sectionsList = useSelector(selectSectionList);
  return (
    <List listStyleType={'none'} px={'xs'} style={{ width: '100%' }}>
      <List.Item
        key={'add-section-input'}
        py={'lg'}
        style={{ width: '100%' }}
      >
        <form
          onSubmit={sectionForm.onSubmit(({ sectionName }) => {
            dispatch(addSection(sectionName));
            sectionForm.reset();
            close();
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
      </List.Item>
      {sectionsList.map(sectionItem => (
        <List.Item
          key={sectionItem.id as React.Key}
          style={{ width: '100%' }}>
          <UnstyledButton
            sx={theme => ({
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              fontSize: theme.fontSizes.sm,
              padding: `${theme.spacing.sm}px ${theme.spacing.xs}px`,
              borderRadius: theme.radius.sm,
              fontWeight: 600,
              color: sectionItem.id === activeSection.id ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color : theme.colors.dark[0],
              backgroundColor: sectionItem.id === activeSection.id ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background : theme.colors.dark[7],

              '&:hover': {
                backgroundColor: sectionItem.id === activeSection.id ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).background : theme.colors.dark[6],
                color: sectionItem.id === activeSection.id ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).color : theme.white,
              }
            })}
            color={sectionItem.id === activeSection.id ? 'blue' : 'dark'}
            onClick={() => dispatch(setActiveSection(sectionItem.id))}
          >
            {sectionItem.name}
          </UnstyledButton>
        </List.Item>
      ))}
    </List>
  )
}

export default TaskSections