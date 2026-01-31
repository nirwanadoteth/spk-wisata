"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod/v3";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Alternative } from "@/lib/types";

/**
 * Form validation schema using Zod
 * Validates user input for new tourism destination
 */
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus diisi minimal 2 karakter.",
  }),
  c1: z.string().min(1, "Pilih nilai Aksesibilitas"),
  c2: z.string().min(1, "Pilih nilai Daya Tarik"),
  c3: z.string().min(1, "Pilih nilai Fasilitas"),
  c4: z.string().min(1, "Pilih nilai Kualitas Layanan"),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * Props for UserInputForm component
 */
interface UserInputFormProps {
  /** Callback when form is successfully submitted */
  onSubmitUser: (data: Alternative) => void;
  /** Callback to close the form modal */
  onClose: () => void;
  /** Optional existing data for editing mode */
  existingData?: Alternative;
}

/**
 * User Input Form Component
 *
 * Form for adding or editing custom tourism destinations to compare against recommendations.
 * Uses React Hook Form with Zod validation for type-safe form handling.
 *
 * @component
 * @example
 * ```tsx
 * // Create mode
 * <UserInputForm
 *   onSubmitUser={(alt) => console.log(alt)}
 *   onClose={() => setOpen(false)}
 * />
 *
 * // Edit mode
 * <UserInputForm
 *   existingData={alternative}
 *   onSubmitUser={(alt) => console.log(alt)}
 *   onClose={() => setOpen(false)}
 * />
 * ```
 */
export function UserInputForm({
  onSubmitUser,
  onClose,
  existingData,
}: UserInputFormProps) {
  const isEditMode = !!existingData;

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: existingData?.name ?? "",
      c1: existingData?.c1.toString() ?? "",
      c2: existingData?.c2.toString() ?? "",
      c3: existingData?.c3.toString() ?? "",
      c4: existingData?.c4.toString() ?? "",
    },
  });

  /**
   * Handles form submission
   * Converts form values to Alternative type and passes to parent
   * In edit mode, preserves the existing ID; in create mode, generates a new UUID
   * React 19.2 note: No need for useCallback with React Compiler enabled
   */
  const onSubmit = (values: FormValues) => {
    const newAlternative: Alternative = {
      id: existingData?.id ?? `user-${crypto.randomUUID()}`,
      name: values.name,
      c1: Number.parseInt(values.c1, 10),
      c2: Number.parseInt(values.c2, 10),
      c3: Number.parseInt(values.c3, 10),
      c4: Number.parseInt(values.c4, 10),
      isUserObj: true,
    };
    onSubmitUser(newAlternative);
  };

  return (
    <div className="h-fit w-full">
      <div className="mb-4">
        <h2 className="font-bold text-gray-800 text-xl">
          {isEditMode ? "Edit Objek Wisata" : "Tambah Objek Wisata Baru"}
        </h2>
        <p className="mt-1 text-gray-600 text-sm">
          {isEditMode
            ? "Perbarui informasi objek wisata"
            : "Masukkan informasi objek wisata yang ingin dibandingkan"}
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nama Objek Wisata</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
                placeholder="Contoh: Situ Patenggang"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* C1: Aksesibilitas */}
          <Controller
            control={control}
            name="c1"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} orientation="responsive">
                <FieldLabel>Aksesibilitas</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Pilih Aksesibilitas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 - Sangat Mudah</SelectItem>
                    <SelectItem value="3">3 - Mudah</SelectItem>
                    <SelectItem value="2">2 - Cukup</SelectItem>
                    <SelectItem value="1">1 - Sulit</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* C2: Daya Tarik */}
          <Controller
            control={control}
            name="c2"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} orientation="responsive">
                <FieldLabel>Daya Tarik</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Pilih Daya Tarik" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 - Sangat Menarik</SelectItem>
                    <SelectItem value="3">3 - Menarik</SelectItem>
                    <SelectItem value="2">2 - Cukup Menarik</SelectItem>
                    <SelectItem value="1">1 - Kurang Menarik</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* C3: Fasilitas */}
          <Controller
            control={control}
            name="c3"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} orientation="responsive">
                <FieldLabel>Fasilitas</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Pilih Kelengkapan Fasilitas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 - Sangat Lengkap</SelectItem>
                    <SelectItem value="3">3 - Lengkap</SelectItem>
                    <SelectItem value="2">2 - Cukup</SelectItem>
                    <SelectItem value="1">1 - Kurang</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* C4: Kualitas Layanan */}
          <Controller
            control={control}
            name="c4"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} orientation="responsive">
                <FieldLabel>Kualitas Layanan</FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Pilih Kualitas Layanan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 - Sangat Baik</SelectItem>
                    <SelectItem value="3">3 - Baik</SelectItem>
                    <SelectItem value="2">2 - Cukup</SelectItem>
                    <SelectItem value="1">1 - Kurang</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button
            className="w-1/2 bg-red-600 hover:bg-red-700"
            onClick={onClose}
            type="button"
          >
            Batal
          </Button>
          <Button
            className="w-1/2 bg-green-600 hover:bg-green-700"
            type="submit"
          >
            {isEditMode ? "Perbarui" : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
