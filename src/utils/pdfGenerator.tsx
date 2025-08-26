import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { BookEntry } from '../types/book';

interface PDFDocumentProps {
  entries: BookEntry[];
  titleSize: number;
}

// Create styles
const createStyles = (titleSize: number) => StyleSheet.create({
  page: {
    backgroundColor: '#0f172a',
    padding: 40,
    fontFamily: 'Courier',
    position: 'relative',
  },
  header: {
    color: 'white',
    fontSize: titleSize,
    marginBottom: 50,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 40,
    borderRadius: 12,
    border: '1px solid #475569',
    position: 'relative',
    marginHorizontal: 60,
    minHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    color: '#10b981',
    fontWeight: 'bold',
    width: 90,
    flexShrink: 0,
  },
  value: {
    color: 'white',
    flex: 1,
    lineHeight: 1.5,
    fontSize: 12,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#64748b',
    fontSize: 12,
  },
  errorCodeBadge: {
    position: 'absolute',
    top: 40,
    right: 40,
    color: '#94a3b8',
    fontSize: 18,
    fontWeight: 'bold',
  },
  trafficLights: {
    position: 'absolute',
    top: 40,
    left: 40,
    flexDirection: 'row',
  },
  trafficLight: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  redLight: {
    backgroundColor: '#ef4444',
  },
  yellowLight: {
    backgroundColor: '#eab308',
  },
  greenLight: {
    backgroundColor: '#22c55e',
  },
});

// PDF Document Component
const PDFDocument = ({ entries, titleSize }: PDFDocumentProps) => {
  const styles = createStyles(titleSize);
  
  return (
    <Document>
      {entries.map((entry, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <Text style={styles.header}>HTTP Errors</Text>
        
          <View style={styles.card}>
            <Text style={styles.errorCodeBadge}>{entry.errorCode}</Text>
          
            {/* Traffic Light Indicators */}
            <View style={styles.trafficLights}>
              <View style={[styles.trafficLight, styles.redLight]} />
              <View style={[styles.trafficLight, styles.yellowLight]} />
              <View style={[styles.trafficLight, styles.greenLight]} />
            </View>
          
            <View style={styles.row}>
              <Text style={styles.label}>Error Code:</Text>
              <Text style={styles.value}>{entry.errorCode}</Text>
            </View>
          
            <View style={styles.row}>
              <Text style={styles.label}>Category:</Text>
              <Text style={styles.value}>{entry.category}</Text>
            </View>
          
            <View style={styles.row}>
              <Text style={styles.label}>Meaning:</Text>
              <Text style={styles.value}>{entry.meaning}</Text>
            </View>
          
            <View style={styles.row}>
              <Text style={styles.label}>Details:</Text>
              <Text style={styles.value}>{entry.details}</Text>
            </View>
          
            <View style={styles.row}>
              <Text style={styles.label}>Fix:</Text>
              <Text style={styles.value}>{entry.fix}</Text>
            </View>
          </View>
        
          <Text style={styles.pageNumber}>Page {index + 1}</Text>
        </Page>
      ))}
    </Document>
  );
};

export const generatePDF = async (entries: BookEntry[], titleSize: number = 24) => {
  const blob = await pdf(<PDFDocument entries={entries} titleSize={titleSize} />).toBlob();
  return blob;
};

export const downloadPDF = async (
  entries: BookEntry[], 
  filename = 'http-errors-reference.pdf',
  titleSize: number = 24
) => {
  const blob = await generatePDF(entries, titleSize);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};