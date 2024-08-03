{{/*
Return the full name of a resource.
*/}}
{{- define "aitdevops-site.fullname" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name -}}
{{- end -}}

{{/*
Return the labels for a resource.
*/}}
{{- define "aitdevops-site.labels" -}}
helm.sh/chart: {{ include "aitdevops-site.chart" . }}
{{ include "aitdevops-site.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{/*
Return the selector labels for a resource.
*/}}
{{- define "aitdevops-site.selectorLabels" -}}
app.kubernetes.io/name: {{ include "aitdevops-site.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/*
Return the chart name.
*/}}
{{- define "aitdevops-site.name" -}}
{{ .Chart.Name }}
{{- end -}}

{{/*
Return the chart name and version.
*/}}
{{- define "aitdevops-site.chart" -}}
{{ .Chart.Name }}-{{ .Chart.Version }}
{{- end -}}
