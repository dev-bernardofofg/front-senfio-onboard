"use client";

import { Loader2, Table2Icon } from "lucide-react";
import Link from "next/link";

import { BasePagination, PaginationData } from "@/app/(components)/(base)/(show-data)/base-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Tipo de paginação baseado no PaginationData do BasePagination
export type PaginationType = PaginationData;

interface Column<T> {
  header: string;
  accessorKey: keyof T;
  className?: string;
  cell?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface BaseTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
  title?: string;
  seeMoreLink?: string;
  emptyMessage?: string;
  loading?: boolean;
  onPaginationChange?: (value: PaginationType) => void;
  pagination?: PaginationType;
}

export interface BaseTableOptions {
  tableOptions: {
    pagination: PaginationType
  }
  onPaginationChange?: (value: PaginationType) => void
}

export function BaseTable<T>({
  data,
  columns,
  actions,
  onRowClick,
  title,
  seeMoreLink,
  emptyMessage = "Nenhum dado encontrado",
  loading = false,
  onPaginationChange,
  pagination,
}: BaseTableProps<T>) {
  return (
    <div className="px-3 py-2">
      {title && (
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Table2Icon className="size-4" />
            <h1 className="text-base font-medium">{title}</h1>
          </div>
          {seeMoreLink && (
            <Link
              href={seeMoreLink}
              className="text-muted-foreground text-sm hover:underline"
            >
              Ver todos
            </Link>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Loader2 className="size-12 text-muted-foreground/50 mb-2 animate-spin" />
          <p className="text-muted-foreground text-sm">Carregando...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Table2Icon className="size-12 text-muted-foreground/50 mb-2" />
          <p className="text-muted-foreground text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={String(column.accessorKey)}
                    className={column.className}
                  >
                    {column.header}
                  </TableHead>
                ))}
                {actions && <TableHead className="w-14"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    onRowClick && "cursor-pointer",
                    "animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
                    `delay-${Math.min(index * 50, 500)}`
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.accessorKey)}
                      className={column.className}
                    >
                      {column.cell
                        ? column.cell(item[column.accessorKey], item)
                        : (item[column.accessorKey] as React.ReactNode)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="w-14">{actions(item)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {pagination && pagination.count > 0 && (
            <div className="mt-4">
              <BasePagination
                data={pagination}
                onPageChange={(page) => {
                  if (onPaginationChange) {
                    const newPagination = {
                      ...pagination,
                      current_page: page,
                      next_page: page < pagination.total_pages ? page + 1 : null,
                      previous_page: page > 1 ? page - 1 : null,
                    };
                    onPaginationChange(newPagination);
                  }
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

/*
Exemplo de uso do BaseTable com paginação:

```tsx
import { BaseTable, PaginationType } from "@/app/(components)/(base)/(tables)/base-table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns = [
  { header: "Nome", accessorKey: "name" as keyof User },
  { header: "Email", accessorKey: "email" as keyof User },
  { header: "Função", accessorKey: "role" as keyof User },
];

const pagination: PaginationType = {
  count: 100,
  current_page: 1,
  next_page: 2,
  page_size: 10,
  previous_page: null,
  total_pages: 10,
};

function MyTable() {
  const [currentPagination, setCurrentPagination] = useState<PaginationType>(pagination);
  
  const handlePaginationChange = (newPagination: PaginationType) => {
    setCurrentPagination(newPagination);
    // Aqui você faria a chamada para a API com os novos parâmetros
    // fetchUsers(newPagination.current_page, newPagination.page_size);
  };

  return (
    <BaseTable
      data={users}
      columns={columns}
      title="Usuários"
      pagination={currentPagination}
      onPaginationChange={handlePaginationChange}
      actions={(user) => (
        <button onClick={() => editUser(user.id)}>
          Editar
        </button>
      )}
    />
  );
}
```
*/