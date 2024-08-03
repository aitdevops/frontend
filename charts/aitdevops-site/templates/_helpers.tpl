# templates/_helpers.tpl
{{/*
Generate a name using the release name and the chart name
*/}}
{{- define "aitdevops-site.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
