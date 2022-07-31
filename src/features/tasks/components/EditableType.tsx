import { ActionIcon, Group, Text, Textarea, TextInput, TextProps, Title, TitleProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Check, X } from 'tabler-icons-react'
import React from 'react'

interface EditableTypeProps {
    text: String,
    setText: Function,
    TypeComponent: typeof Text | typeof Title,
    TypeComponentProps: TextProps | TitleProps,
    inputType?: 'text' | 'textarea',
    placeHolder?: String,
    required?: Boolean,
}

function EditableType({ text, setText, TypeComponent, TypeComponentProps, inputType = 'text', placeHolder = "Enter text here...", required = false }: EditableTypeProps) {
    const [isEdit, setEdit] = useDisclosure(!text?.length);
    const BoundedTypeElement = ((Component) => (props) => <Component onClick={setEdit.open} {...props}>{text}</Component>)(TypeComponent)
    const form = useForm({
        initialValues: {
            text: text
        },
        validate: {
            text: (value) => required && value.length === 0 ? "This is Field is Required" : null
        }
    })
    return (
        <>
            {isEdit ? (
                <form style={{ width: '100%' }} onSubmit={form.onSubmit(({ text }) => {
                    setText(text);
                    setEdit.close();
                })}>
                    {inputType === 'text' ?
                        <TextInput variant={'default'} {...form.getInputProps('text')} onBlur={setEdit.close} placeholder={placeHolder as string} autoFocus></TextInput> :
                        <Textarea 
                            minRows={4} 
                            maxRows={8} 
                            {...form.getInputProps('text')} 
                            onBlur={() => {
                                if(form.values.text.length === 0) return;
                                setText(form.values.text); 
                                setEdit.close()
                            }} 
                            placeholder={placeHolder as string} 
                            autosize 
                            autoFocus
                        ></Textarea>
                    }
                    <Group position='right' mt={'sm'}>
                        <ActionIcon<'button'> component='button' type='submit' color={'green'} variant='light' onClick={() => { setText(form.values.text); setEdit.close() }}><Check size={16} /></ActionIcon>
                        <ActionIcon color={'red'} variant={'light'} onClick={setEdit.close}><X size={16} /></ActionIcon>
                    </Group>
                </form>
            ) : <BoundedTypeElement {...TypeComponentProps} />
            }
        </>
    );
}

export default EditableType;