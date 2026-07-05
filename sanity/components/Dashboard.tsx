import { useEffect, useState } from "react";
import { useClient } from "sanity";
import { Card, Grid, Stack, Text, Heading, Spinner, Flex } from "@sanity/ui";

interface Stats {
  totalWines: number;
  activeWines: number;
  totalFarmProducts: number;
  activeFarmProducts: number;
  activeAnnouncement: boolean;
}

const query = `{
  "totalWines": count(*[_type == "wine"]),
  "activeWines": count(*[_type == "wine" && active != false]),
  "totalFarmProducts": count(*[_type == "farmProduct"]),
  "activeFarmProducts": count(*[_type == "farmProduct" && active == true]),
  "activeAnnouncement": count(*[_type == "homepageAnnouncement"
    && (!defined(validFrom) || validFrom <= now())
    && (!defined(validUntil) || validUntil >= now())
  ]) > 0
}`;

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card padding={3} radius={2} tone="primary" border>
      <Stack space={2}>
        <Text size={1} muted>
          {label}
        </Text>
        <Heading size={3}>{value}</Heading>
      </Stack>
    </Card>
  );
}

export function Dashboard() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    client.fetch<Stats>(query).then(setStats);
  }, [client]);

  if (!stats) {
    return (
      <Flex align="center" justify="center" padding={4}>
        <Spinner />
      </Flex>
    );
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Heading size={2}>Přehled Metroflora</Heading>

        <Grid columns={[2, 2, 4]} gap={3}>
          <StatCard label="Vína celkem" value={stats.totalWines} />
          <StatCard label="Vína aktivní v eshopu" value={stats.activeWines} />
          <StatCard label="Prodej ze dvora celkem" value={stats.totalFarmProducts} />
          <StatCard label="Aktivní na webu" value={stats.activeFarmProducts} />
        </Grid>

        <Card padding={3} radius={2} tone={stats.activeAnnouncement ? "positive" : "transparent"} border>
          <Text size={1}>
            {stats.activeAnnouncement
              ? "Na úvodní straně je aktuálně zobrazena novinka."
              : "Na úvodní straně se zobrazuje obecný text — žádná novinka teď není aktivní."}
          </Text>
        </Card>

        <Card padding={3} radius={2} tone="transparent" border>
          <Text size={1} muted>
            Statistiky návštěvnosti, objednávek a zákazníků zatím nejsou k dispozici — web zatím
            nemá dokončený objednávkový systém (fáze 2) ani napojenou analytiku návštěvnosti. Až
            budou k dispozici, doplníme je sem.
          </Text>
        </Card>
      </Stack>
    </Card>
  );
}
