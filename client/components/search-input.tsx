import { Input } from "@/components/ui/input"


import React, { useRef, useCallback } from "react";

const SearchInput = ({ handleSearch }: { handleSearch: (query: string) => void }) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debouncedHandleSearch = useCallback((value: string) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      handleSearch(value);
    }, 400); // 400ms debounce
  }, [handleSearch]);

  return (
    <Input
      onKeyUp={(e) => {
        debouncedHandleSearch(e.currentTarget.value);
      }}
      type="text"
      placeholder="Search games..."
      className="w-1/2 rounded-0"
    />
  );
}

export default SearchInput;