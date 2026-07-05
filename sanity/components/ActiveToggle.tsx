import { useCallback, useState, type ChangeEvent, type MouseEvent } from "react";
import { useClient } from "sanity";
import { Switch, Tooltip, Text } from "@sanity/ui";

export function ActiveToggle({ id, active }: { id: string; active: boolean }) {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [checked, setChecked] = useState(Boolean(active));
  const [loading, setLoading] = useState(false);

  const stop = useCallback((event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = event.currentTarget.checked;
      setChecked(next);
      setLoading(true);
      client
        .patch(id)
        .set({ active: next })
        .commit({ autoGenerateArrayKeys: true })
        .catch(() => setChecked((c) => !c))
        .finally(() => setLoading(false));
    },
    [client, id]
  );

  return (
    <Tooltip content={<Text size={1}>{checked ? "Aktivní" : "Neaktivní"}</Text>} placement="top">
      <span
        onClick={stop}
        onMouseDown={stop}
        style={{ display: "inline-flex", pointerEvents: "auto", cursor: "pointer" }}
      >
        <Switch checked={checked} onChange={handleChange} disabled={loading} />
      </span>
    </Tooltip>
  );
}
