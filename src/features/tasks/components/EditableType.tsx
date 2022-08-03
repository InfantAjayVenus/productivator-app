import { Text, Textarea, TextInput, TextProps, Title, TitleProps } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import React from 'react'

interface EditableTypeProps {
    text: String,
    setText: Function,
    TypeComponent: typeof Text | typeof Title,
    TypeComponentProps: TextProps | TitleProps,
    inputType?: 'text' | 'textarea' | 'date',
    label?: String | null,
    placeHolder?: String,
    required?: Boolean,
}

function EditableType({ text, setText, TypeComponent, TypeComponentProps, inputType = 'text', label=null, placeHolder = "Enter text here...", required = false }: EditableTypeProps) {
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

    const blurHandler = () => {
        if (form.values.text.length === 0) return;
        setText(form.values.text);
        setEdit.close();
    }
    return (
        <>
            {isEdit ? (
                <form style={{ width: '100%' }} onSubmit={form.onSubmit(({ text }) => {
                    setText(text);
                    setEdit.close();
                })}>
                    {inputType === 'text' &&
                        <TextInput variant={'default'} {...form.getInputProps('text')} onBlur={blurHandler} {...{label}} placeholder={placeHolder as string} autoFocus></TextInput>
                    }
                    {inputType === 'textarea' &&
                        <Textarea
                            minRows={4}
                            maxRows={8}
                            {...form.getInputProps('text')}
                            onBlur={blurHandler}
                            {...{label}}
                            placeholder={placeHolder as string}
                            autosize
                            autoFocus
                        ></Textarea>
                    }
                </form>
            ) : <BoundedTypeElement {...TypeComponentProps} />
            }
        </>
    );
}

export default EditableType;