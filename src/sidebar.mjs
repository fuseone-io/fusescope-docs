/** Site navigation, shared by Starlight and the Markdown export. */
export const sidebar = [
  {
    label: "Start here",
    items: [
      { label: "What is FuseScope?", slug: "start/what-is-fusescope" },
      { label: "Core concepts", slug: "start/concepts" },
      { label: "Tour of the interface", slug: "start/tour" },
      { label: "Glossary", slug: "reference/glossary" },
    ],
  },
  {
    label: "Install",
    items: [{ label: "Install with Helm", slug: "install/helm" }],
  },
  {
    label: "Send data",
    items: [
      { label: "Data source catalog", slug: "sending-data/data-source-catalog" },
      { label: "OTLP endpoints", slug: "sending-data/otlp" },
      {
        label: "Instrument applications",
        items: [
          { label: "Overview", slug: "sending-data/instrumentation" },
          { label: "Java", slug: "sending-data/instrumentation/java" },
          { label: ".NET", slug: "sending-data/instrumentation/dotnet" },
          { label: "Node.js", slug: "sending-data/instrumentation/nodejs" },
          { label: "Python", slug: "sending-data/instrumentation/python" },
          { label: "Go", slug: "sending-data/instrumentation/go" },
          { label: "Ruby", slug: "sending-data/instrumentation/ruby" },
          { label: "PHP", slug: "sending-data/instrumentation/php" },
        ],
      },
      {
        label: "Collector",
        items: [
          { label: "Collector on Docker", slug: "sending-data/collector-docker" },
          { label: "Collector on a VM", slug: "sending-data/collector-vm" },
        ],
      },
      {
        label: "Infrastructure",
        items: [
          { label: "Kubernetes", slug: "sending-data/kubernetes" },
          { label: "Hosts", slug: "sending-data/hosts" },
          { label: "Prometheus metrics", slug: "sending-data/prometheus" },
        ],
      },
      {
        label: "Logs",
        items: [
          { label: "Logs from files", slug: "sending-data/logs-files" },
          { label: "Kubernetes logs", slug: "sending-data/logs-kubernetes" },
          { label: "Syslog", slug: "sending-data/logs-syslog" },
          { label: "Fluent Bit and Fluentd", slug: "sending-data/logs-fluent" },
          { label: "Log pipelines", slug: "sending-data/log-pipelines" },
        ],
      },
      {
        label: "Integrations",
        items: [
          { label: "Overview", slug: "sending-data/integrations" },
          { label: "ClickHouse", slug: "sending-data/integrations/clickhouse" },
          { label: "MongoDB", slug: "sending-data/integrations/mongodb" },
          { label: "Nginx", slug: "sending-data/integrations/nginx" },
          { label: "PostgreSQL", slug: "sending-data/integrations/postgresql" },
          { label: "Redis", slug: "sending-data/integrations/redis" },
          { label: "AWS RDS MySQL", slug: "sending-data/integrations/aws-rds-mysql" },
          {
            label: "AWS RDS PostgreSQL",
            slug: "sending-data/integrations/aws-rds-postgresql",
          },
          {
            label: "AWS ElastiCache Redis",
            slug: "sending-data/integrations/aws-elasticache-redis",
          },
        ],
      },
    ],
  },
  {
    label: "How-to guides",
    items: [
      { label: "Investigate a slow endpoint", slug: "guides/slow-endpoint" },
      { label: "Find out why a service is failing", slug: "guides/failing-service" },
      { label: "See the logs for one request", slug: "guides/logs-for-a-request" },
      { label: "Build your first dashboard", slug: "guides/first-dashboard" },
      { label: "Set up your first alert", slug: "guides/first-alert" },
    ],
  },
  {
    label: "Observe",
    items: [
      { label: "Home", slug: "observe/home" },
      { label: "Services", slug: "apm/services" },
      { label: "Traces explorer", slug: "explore/traces" },
      { label: "Trace details", slug: "explore/trace-details" },
      { label: "Logs explorer", slug: "explore/logs" },
      { label: "Metrics explorer", slug: "explore/metrics" },
      { label: "Dashboards", slug: "dashboards/dashboards" },
      { label: "Panel editor", slug: "dashboards/panel-editor" },
      { label: "Dashboard variables", slug: "dashboards/variables" },
      { label: "Dashboard JSON", slug: "reference/dashboard-json" },
      { label: "Infrastructure", slug: "observe/infrastructure" },
      { label: "Service Map", slug: "apm/service-map" },
    ],
  },
  {
    label: "Frontend (RUM)",
    badge: { text: "Beta", variant: "caution" },
    items: [
      { label: "Real User Monitoring", slug: "frontend/real-user-monitoring" },
      { label: "Set up a web application", slug: "frontend/set-up-web" },
      { label: "Set up React RUM", slug: "frontend/set-up-react" },
      { label: "Set up an Android application", slug: "frontend/set-up-android" },
      { label: "Applications and Overview", slug: "frontend/applications" },
      { label: "Views", slug: "frontend/views" },
      { label: "Sessions", slug: "frontend/sessions" },
      { label: "Errors", slug: "frontend/errors" },
      { label: "Source maps", slug: "frontend/source-maps" },
      { label: "R8 mappings", slug: "frontend/r8-mappings" },
      { label: "Frontend alerts", slug: "frontend/alerts" },
      { label: "Keys", slug: "frontend/keys" },
      { label: "Browser SDK reference", slug: "frontend/sdk-reference" },
      { label: "CLI reference", slug: "frontend/cli-reference" },
      { label: "Use another OpenTelemetry client", slug: "frontend/opentelemetry-clients" },
    ],
  },
  {
    label: "Respond",
    items: [
      { label: "Alert rules", slug: "alerts/alert-rules" },
      { label: "Notification channels", slug: "alerts/notification-channels" },
      { label: "Routing and planned downtime", slug: "alerts/routing-and-downtime" },
      { label: "Exceptions", slug: "apm/exceptions" },
    ],
  },
  {
    label: "Analyze",
    items: [
      { label: "External APIs", slug: "analyze/external-apis" },
      { label: "Messaging Queues", slug: "analyze/messaging-queues" },
      {
        label: "AI Observability",
        items: [
          { label: "Overview", slug: "analyze/ai-observability" },
          { label: "Set up Python", slug: "analyze/ai-observability-python" },
          { label: "Set up Node.js", slug: "analyze/ai-observability-nodejs" },
        ],
      },
      { label: "Cost Meter", slug: "analyze/cost-meter" },
    ],
  },
  {
    label: "Query reference",
    items: [
      { label: "Search syntax", slug: "querying/search-syntax" },
      { label: "Query builder", slug: "querying/query-builder" },
      { label: "ClickHouse SQL and PromQL", slug: "querying/clickhouse-promql" },
    ],
  },
  {
    label: "Operate",
    items: [
      { label: "Users and roles", slug: "administration/users-and-roles" },
      { label: "Service accounts", slug: "administration/service-accounts" },
      { label: "Single sign-on", slug: "configuration/sso" },
      { label: "Impersonation mode", slug: "configuration/impersonation-mode" },
      { label: "Data retention", slug: "administration/retention" },
      { label: "Configuration file", slug: "configuration/config-file" },
      { label: "Metadata store", slug: "configuration/metadata-store" },
      { label: "Architecture", slug: "reference/architecture" },
    ],
  },
];
