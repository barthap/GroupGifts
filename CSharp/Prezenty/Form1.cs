using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Windows.Forms;

namespace Prezenty
{

    public partial class Form1 : Form
    {
        Controller ctrl;

        public Form1()
        {
            ctrl = new Controller();

            //w przypadku braku delegatów beda uzyte domyślne w klasie Controller
            ctrl.receiveDelegate += receiveStr;
            ctrl.giveDelegate += giveStr;
            ctrl.tradeDelegate += tradeStr;

            InitializeComponent();
        }

        //przykladowe definicje delegatow
        static string receiveStr(string name, double a)     //osoba name otrzymuje a zł
        {
            return name + " ma dać ogólnie " + Math.Round(a, 2).ToString() + " zł\r\n";
        }
        static string giveStr(string name, double a)        //osoba name oddaje a zł
        {
            return name + " ma dostać ogólnie " + Math.Round(a, 2).ToString() + " zł\r\n";
        }
        static string tradeStr(string from, string to, double a)    //osoba from daje osobie to a zł
        {
            return from + " ma dać " + Math.Round(a, 2) + " zł dla " + to + "\r\n";
        }

        void UpdateLabels()
        {
            ctrl.Calculate(osobyList.Items);

            iloscOsobLabel.Text = "Liczba Osób: " + ctrl.PersonCount.ToString();
            sumaLabel.Text = "Suma: " + ctrl.Sum.ToString() + " zł";
            hajsNaOsobeLabel.Text = "Zł / os: " + Math.Round(ctrl.SumPerOs, 2).ToString();


            wynikiBox.Clear();
            wynikiBox.AppendText(ctrl.ResultText);

        }

        private void Form1_Load(object sender, EventArgs e)
        {
            osobyList.DisplayMember = "ShowValue";
            osobyList.ValueMember = "ileZaplacila";

            Person [] obj = Controller.LoadExampleData().ToArray();
            osobyList.Items.AddRange(obj);

            UpdateLabels();
        }

        private void buttonAdd_Click(object sender, EventArgs e)
        {
            double val = 0;
            if (Double.TryParse(valueBox.Text, out val) == false) MessageBox.Show("Zle wpisany hajs", "Blad", MessageBoxButtons.OK, MessageBoxIcon.Error);
             osobyList.Items.Add(new Person(nameBox.Text, val));

            UpdateLabels();
        }

        private void osobyList_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (osobyList.SelectedIndex < 0) return;
            Person os = osobyList.SelectedItem as Person;
            nameBox.Text = os.name;
            valueBox.Text = os.HowMuchPaid.ToString();

        }

        private void buttonEdit_Click(object sender, EventArgs e)
        {
            double val = 0;
            bool res = Double.TryParse(valueBox.Text, out val);
            if (!res)
            {
                MessageBox.Show("Źle wpisany hajs, tylko cyfry i przecinek!", "Błąd", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }


            (osobyList.SelectedItem as Person).name = nameBox.Text;
            (osobyList.SelectedItem as Person).HowMuchPaid = val;

            osobyList.Refresh();

            UpdateLabels();
        }

        private void buttonDelete_Click(object sender, EventArgs e)
        {
            if (osobyList.SelectedIndex >= 0)
                osobyList.Items.RemoveAt(osobyList.SelectedIndex);

            UpdateLabels();
        }

        //drag and drop
        private void listBox_MouseDown(object sender, MouseEventArgs e)
        {
            if (this.osobyList.SelectedItem == null) return;
            this.osobyList_SelectedIndexChanged(sender, null);
            this.osobyList.DoDragDrop(this.osobyList.SelectedItem, DragDropEffects.Move);
        }

        private void listBox_DragOver(object sender, DragEventArgs e)
        {
            e.Effect = DragDropEffects.Move;
        }

        private void listBox_DragDrop(object sender, DragEventArgs e)
        {
            Point point = osobyList.PointToClient(new Point(e.X, e.Y));
            int index = this.osobyList.IndexFromPoint(point);
            if (index < 0) index = this.osobyList.Items.Count - 1;
            object data = osobyList.SelectedItem;
            this.osobyList.Items.Remove(data);
            this.osobyList.Items.Insert(index, data);

            UpdateLabels();
        }
    }
}
