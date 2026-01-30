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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus diisi minimal 2 karakter.",
  }),
  c1: z.string().min(1, "Pilih nilai Aksesibilitas"),
  c2: z.string().min(1, "Pilih nilai Daya Tarik"),
  c3: z.string().min(1, "Pilih nilai Fasilitas"),
  c4: z.string().min(1, "Pilih nilai Kualitas Layanan"),
});

interface UserInputFormProps {
  onSubmitUser: (data: Alternative) => void;
  onClose: () => void;
}

export function UserInputForm({ onSubmitUser, onClose }: UserInputFormProps) {
  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      c1: "",
      c2: "",
      c3: "",
      c4: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newAlternative: Alternative = {
      id: `user-${crypto.randomUUID()}`,
      name: values.name,
      c1: Number.parseInt(values.c1, 10),
      c2: Number.parseInt(values.c2, 10),
      c3: Number.parseInt(values.c3, 10),
      c4: Number.parseInt(values.c4, 10),
      isUserObj: true,
    };
    onSubmitUser(newAlternative);
  }

  return (
    <div className="h-fit w-full">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {" "}
        {/* Changed space-y-4 to space-y-6 */}
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
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}
