import { Text, TextProps, Title, TitleProps } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

interface EditableDateProps {
    date?: Date | null;
    setDate: Function;
    TypeComponent: typeof Text | typeof Title | typeof DatePicker;
    TypeComponentProps: TextProps | TitleProps;
    label?: String | null;
    placeHolder?: String;
    required?: Boolean;
}

function EditableDate({
    date = null,
    setDate,
    TypeComponent,
    TypeComponentProps,
    label = null,
    placeHolder = "Pick a Date...",
    required = false,
}: EditableDateProps) {
    const [isEdit, setEdit] = useDisclosure(date === null);
    const BoundedTypeElement = (
        (Component) => (props) =>
        (
            <Component onClick={setEdit.open} {...props}>
                {date.toDateString()}
            </Component>
        )
    )(TypeComponent);
    const form = useForm({
        initialValues: {
            date: date,
        },
    });

    const blurHandler = () => {
        if (form.values.date === null) return;
        setDate(form.values.date);
        setEdit.close();
    };
    return (
        <>
            {isEdit ? (
                <form
                    style={{ width: "100%" }}
                    onSubmit={form.onSubmit(({ date }) => {
                        setDate(date);
                        setEdit.close();
                    })}
                >
                    <DatePicker
                        {...form.getInputProps("date")}
                        onChange={blurHandler}
                        minDate={new Date()}
                        dropdownType="modal"
                        {...{
                            placeholder: placeHolder as string,
                            label,
                            required: required as boolean,
                        }}
                    />
                </form>
            ) : (
                <BoundedTypeElement {...TypeComponentProps} />
            )}
        </>
    );
}

export default EditableDate;
