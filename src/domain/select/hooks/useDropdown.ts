import { useState, useRef, useEffect } from "react";

type ReturnTypes = [boolean, React.RefObject<HTMLDivElement>, () => void];

const useDropdown = (): ReturnTypes => {
  const [isOpen, setIsOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
        setIsOpen((prev) => !prev);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen]);

  return [isOpen, dropRef, handleClick];
};

export default useDropdown;
