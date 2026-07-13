import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Admin() {
  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your shop activity</p>
      </div>

      {/* Cards */}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenue
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">$12,430</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">320</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customers
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-bold">1,240</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>

              <h3 className="text-3xl font-bold mt-1">$12,430</h3>

              <p className="text-sm text-success mt-2">+12.5% this month</p>
            </div>

            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              💰
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table placeholder */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-medium mb-3">Recent Orders</h3>

        <div className="text-muted-foreground text-sm">
          Table will go here...
        </div>
      </div>
    </div>
  );
}
